import AssignmentCard from "@/components/AssignmentCard";
import AssignmentListEmpty from "@/components/AssignmentListEmpty";
import FeedbackDialog from "@/components/FeedbackDialog";
import Greeting from "@/components/Greeting";
import TaskTextarea from "@/components/TaskTextarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  sendAnswers,
  sendFeedback,
  sendTaskDescription,
} from "@/lib/api/assignTaskApi";
import { router } from "@/router";
import { useMutation } from "@tanstack/react-query";
import { AlertTriangle, Goal, ListRestart, Loader2, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
}
interface Answers {
  [key: string]: string;
}
interface TaskApiResponse {
  task: { id: number };
  questions: string[];
  prefilled_details: any;
}
interface SubmitAnswersPayload {
  answers: Answers;
}
interface SubmitAnswersResponse {
  assignment_result: string;
}

const exampleTasks = [
  "Build an e-commerce website with Laravel and Vue.js.",
  "Develop a mobile app for online ordering.",
  "Create a dashboard for visualizing sales data.",
];

export default function AssignTaskPage({ setIsPageDirty }) {
  const [uiState, setUiState] = useState<"initial" | "chat" | "result">(
    "initial"
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [assignment, setAssignment] = useState([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [taskData, setTaskData] = useState<TaskApiResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  // --- State for Feedback Dialog ---
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // --- Mock API Call for Feedback ---

  const handleSendTask = (taskDescription) => {
    createTaskMutation.mutate({ description: taskDescription });
  };

  const handleOpenFeedbackDialog = (assignment) => {
    setSelectedAssignment(assignment);
    setIsFeedbackDialogOpen(true);
  };

  const handleSubmitFeedback = (assignmentId, rating) => {
    feedbackMutation.mutate({
      rating: rating,
      assignmentId: assignmentId,
    });
  };

  const feedbackMutation = useMutation({
    mutationFn: sendFeedback,
    onSuccess: (data) => {
      toast.success("Feedback Submitted Successfully");
      setIsFeedbackDialogOpen(false); // Close dialog on success
      // Here you could show a success toast
    },
    onError: (error) => {
      console.error("Failed to submit feedback:", error);
      // Here you could show an error toast
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: sendTaskDescription,
    onMutate: (data) => {
      setUiState("chat");
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: data.description, sender: "user" },
      ]);
    },
    onSuccess: (data) => {
      setTaskData(data);
      console.log("data ==> ", data);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: data.questions[0], sender: "assistant" },
      ]);
    },
    onError: (err) => {
      setUiState("initial");
      setIsPageDirty(false);
      setLoading(false);
      setMessages([]);
      console.error("Error creating task:", err);
    },
  });

  const submitAnswersMutation = useMutation({
    mutationFn: sendAnswers,
    onSuccess: (data) => {
      console.log("data ==> ", data);
      setUiState("result");
      setAssignment(data);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "An error occurred while finalizing the task. Please contact support.",
          sender: "assistant",
        },
      ]);
    },
  });

  const handleRestart = () => {
    setIsPageDirty(false);
    setUiState("initial");
    setMessages([]);
    setAssignment([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setLoading(false);
  };

  useEffect(() => {
    if (uiState !== "initial") {
      setIsPageDirty(true);
    }
  }, [uiState, setIsPageDirty]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, createTaskMutation.isPending, submitAnswersMutation.isPending]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const currentQuestion = taskData.questions[currentQuestionIndex];
    const newAnswers = { ...answers, [currentQuestion]: text };
    setAnswers(newAnswers);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < taskData.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      await setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: taskData.questions[nextQuestionIndex],
            sender: "assistant",
          },
        ]);
        setLoading(false);
      }, 20);
    } else {
      console.log("taskData.task.id ==> ", taskData.task.id);
      setTimeout(() => {
        submitAnswersMutation.mutate({
          answers: newAnswers,
          taskId: taskData.task.id,
          prefilled_details: taskData.prefilled_details,
        });
        setLoading(false);
      }, 20);
    }
  };

  const isInputDisabled =
    loading ||
    createTaskMutation.isPending ||
    submitAnswersMutation.isPending ||
    (taskData &&
      !createTaskMutation.isPending &&
      submitAnswersMutation.isSuccess);

  return (
    <>
      <FeedbackDialog
        isOpen={isFeedbackDialogOpen}
        assignment={selectedAssignment}
        onClose={() => setIsFeedbackDialogOpen(false)}
        onSubmit={handleSubmitFeedback}
      />

      <div className="flex flex-col h-full  mx-auto w-full">
        {uiState === "initial" ? (
          // For the initial state, we center the content.
          <div className="flex flex-col h-full items-center justify-center p-4 text-center">
            <Greeting />
            <TaskTextarea
              onSendMessage={handleSendTask}
              placeholder="Send you'r task to TASKILL"
            />
            <div className="w-full px-10 mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {exampleTasks.map((task, index) => (
                <Card
                  key={index}
                  onClick={() => handleSendTask(task)}
                  className="cursor-pointer text-left p-4  dark:bg-slate-800/50 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {task}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ) : uiState === "chat" ? (
          // For the chat state, we use a fragment to render two main sections:
          // 1. The scrollable message list.
          // 2. The sticky input area at the bottom.
          <>
            {/* 1. Scrollable message container */}
            <div className="custom-scrollbar flex-1 overflow-y-auto p-12 space-y-9">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex w-full items-start gap-0 ${
                    msg.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.sender === "assistant" && (
                    <div className="w-12 h-12 rounded-tr-none  rounded-full bg-slate-300 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Goal className="w-6 h-6 text-foreground dark:text-slate-50   " />
                    </div>
                  )}
                  <div
                    className={`max-w-lg p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-slate-300 text-foreground  dark:bg-slate-800  dark:text-slate-50 rounded-tl-none"
                    }`}
                  >
                    <p className="text-md leading-relaxed">{msg.text}</p>
                  </div>
                  {msg.sender === "user" && (
                    <div className="w-12 h-12 rounded-tl-none   rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Indicators */}
              {(createTaskMutation.isPending || loading) && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Goal className="w-5 h-5 text-white" />
                  </div>
                  <div className="max-w-md p-3 rounded-2xl bg-slate-200 dark:bg-slate-800">
                    <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
                  </div>
                </div>
              )}
              {submitAnswersMutation.isPending && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <Goal className="w-5 h-5 text-white" />
                  </div>
                  <div className="max-w-md p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />{" "}
                    <span>
                      Assignments are now being generated and messages sent to
                      employees.
                    </span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* 2. Sticky input container at the bottom */}
            <div className="p-4 justify-center items-center flex flex-col relative">
              <TaskTextarea
                isDisabled={isInputDisabled}
                onSendMessage={handleSendMessage}
                placeholder="Answer the question"
              />
              {(createTaskMutation.isError ||
                submitAnswersMutation.isError) && (
                <div className="flex items-center justify-center text-red-500 text-xs mt-2">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <span>An error occurred. Please refresh and try again.</span>
                </div>
              )}
              <Button
                onClick={handleRestart}
                variant="outline"
                className="absolute -top-3"
              >
                <div className="flex gap-2 items-center">
                  Restart
                  <ListRestart />
                </div>
              </Button>
            </div>
          </>
        ) : (
          <div className="p-12 pb-25">
            <div>
              <h2 className="text-3xl font-bold text-center tracking-tight mb-2">
                Task Assignments
              </h2>
              <p className="text-center text-muted-foreground mb-8">
                Here are the generated sub-tasks and their assignments.
              </p>
              {assignment.length === 0 ? (
                <AssignmentListEmpty />
              ) : (
                <div className=" grid grid-cols-2 gap-6">
                  {assignment.map((assignment) => (
                    <AssignmentCard
                      onFeedbackClick={handleOpenFeedbackDialog}
                      key={assignment.id}
                      assignment={assignment}
                    />
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={handleRestart}
              className="absolute bottom-10 right-10"
            >
              <div className="flex gap-2 items-center">
                Restart
                <ListRestart />
              </div>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
