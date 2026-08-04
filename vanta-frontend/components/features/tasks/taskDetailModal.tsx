"use client";

import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Task, Priority, Status } from "@/types/Task";
import {
  Sparkles,
  Send,
  Calendar,
  User,
  Briefcase,
  CheckCircle2,
  Clock,
  CircleDot,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  MessageSquare,
} from "lucide-react";
import { SubTask, Comment, TaskDetailModalProps } from "@/types/Task";

function getMockComments(id?: string): Comment[] {
  if (id === "T-1") {
    return [
      {
        id: "c-1",
        author: "Sarah Chen",
        avatar: "SC",
        content:
          "We should check the currency conversions if we want to expand to Europe.",
        createdAt: "3 hours ago",
      },
      {
        id: "c-2",
        author: "James Smith",
        avatar: "JS",
        content:
          "Good point. I've initialized the Stripe SDK settings to check supported currencies dynamically.",
        createdAt: "1 hour ago",
      },
    ];
  }

  if (id === "T-2") {
    return [
      {
        id: "c-1",
        author: "Eddie Lake",
        avatar: "EL",
        content:
          "The authentication token fails validation when refreshing on mobile screens.",
        createdAt: "4 hours ago",
      },
      {
        id: "c-2",
        author: "Eddie Lake",
        avatar: "EL",
        content:
          "We need to debug whether cookie headers are blocked in CORS configurations.",
        createdAt: "45 mins ago",
      },
    ];
  }

  return [
    {
      id: "c-1",
      author: "Sarah Chen",
      avatar: "SC",
      content:
        "Please complete this as soon as possible. We have a showcase demo scheduled.",
      createdAt: "Yesterday",
    },
  ];
}

export function TaskDetailModal({
  open,
  onOpenChange,
  task,
}: TaskDetailModalProps) {
  // Local task state to enable editing
  const [localTask, setLocalTask] = useState<Task | undefined>(task);
  const [comments, setComments] = useState(() => getMockComments(task?.id));
  const [newComment, setNewComment] = useState("");

  // AI breakdown states
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll comments to bottom when new comments are added
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  if (!localTask) return null;

  // Status Icon Selector
  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "Done":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
      case "In Process":
        return (
          <CircleDot className="h-4 w-4 text-blue-500 animate-pulse shrink-0" />
        );
      default:
        return <Clock className="h-4 w-4 text-amber-500 shrink-0" />;
    }
  };

  // Priority Badge styling
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900/30 dark:text-slate-400 dark:border-slate-800/50";
    }
  };

  // AI Breakdown generator
  const handleGenerateAIBreakdown = () => {
    setIsGenerating(true);
    setGenerationStep("Analyzing task specifications...");

    setTimeout(() => {
      setGenerationStep("Decomposing tasks into structural requirements...");

      setTimeout(() => {
        setGenerationStep("Finalizing checklist of deliverables...");

        setTimeout(() => {
          let generated: SubTask[] = [];

          if (
            localTask.title.toLowerCase().includes("payment") ||
            localTask.title.toLowerCase().includes("stripe")
          ) {
            generated = [
              {
                id: "s-1",
                title:
                  "Set up Stripe developer dashboard & API credentials keys",
                completed: false,
              },
              {
                id: "s-2",
                title:
                  "Design responsive Stripe Elements payment form input UI",
                completed: false,
              },
              {
                id: "s-3",
                title: "Develop backend API endpoint to create PaymentIntents",
                completed: false,
              },
              {
                id: "s-4",
                title: "Implement security webhook verification checks",
                completed: false,
              },
            ];
          } else if (
            localTask.title.toLowerCase().includes("auth") ||
            localTask.title.toLowerCase().includes("user")
          ) {
            generated = [
              {
                id: "s-1",
                title: "Isolate token expiration cookies issue locally",
                completed: false,
              },
              {
                id: "s-2",
                title: "Optimize refresh token rotation middleware handlers",
                completed: false,
              },
              {
                id: "s-3",
                title: "Add strict CORS credentials validation checks",
                completed: false,
              },
              {
                id: "s-4",
                title:
                  "Run automated regression tests for authentication pipeline",
                completed: false,
              },
            ];
          } else {
            generated = [
              {
                id: "s-1",
                title: "Review requirements sheet and identify missing details",
                completed: false,
              },
              {
                id: "s-2",
                title:
                  "Design technical implementation layout & utility interfaces",
                completed: false,
              },
              {
                id: "s-3",
                title:
                  "Implement core functional elements & error bounds handler",
                completed: false,
              },
              {
                id: "s-4",
                title: "Verify features flow using integration test scenarios",
                completed: false,
              },
            ];
          }

          setSubtasks(generated);
          setIsGenerating(false);
          setGenerationStep("");
          toast.success("AI Task Breakdown generated successfully!", {
            icon: <Sparkles className="h-4 w-4 text-primary" />,
          });
        }, 600);
      }, 600);
    }, 600);
  };

  // Subtask Handlers
  const toggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, completed: !sub.completed } : sub,
      ),
    );
  };

  const deleteSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((sub) => sub.id !== id));
    toast.info("Subtask removed");
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: SubTask = {
      id: `s-manual-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    setSubtasks((prev) => [...prev, newSub]);
    setNewSubtaskTitle("");
    toast.success("Subtask added");
  };

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCom: Comment = {
      id: `c-manual-${Date.now()}`,
      author: "You",
      avatar: "YO",
      content: newComment.trim(),
      createdAt: "Just now",
    };
    setComments((prev) => [...prev, newCom]);
    setNewComment("");
    toast.success("Comment posted");
  };

  const handleFieldChange = (name: keyof Task, value: string) => {
    setLocalTask((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // Statistics calculation for progress bar
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const completionPercentage =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[75vw] max-w-5xl h-[85vh] p-0 flex flex-col rounded-xl overflow-hidden border border-border">
        {/* Main Header / Topbar */}
        <DialogTitle>
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2.5">
              <Badge
                variant="outline"
                className="font-mono text-xs px-2 py-0.5 border-primary/20 text-primary bg-primary/5 rounded-md"
              >
                {localTask.id}
              </Badge>
              <span className="text-xs text-muted-foreground">/</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <Briefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
                {localTask.workspace || "General Tasks"}
              </span>
            </div>
          </div>
        </DialogTitle>
        {/* Modal Columns Grid */}
        <div className="grid grid-cols-10 flex-1 overflow-hidden">
          {/* Left Panel: 70% (col-span-7) */}
          <div className="col-span-7 p-6 overflow-y-auto flex flex-col gap-6 border-r border-border h-full bg-card">
            {/* Title Section */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold border-none outline-none focus:ring-0 w-full bg-transparent p-0 font-heading text-foreground">
                {localTask.title}
              </h1>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                Description
              </label>
              <div className="text-sm bg-muted/20 hover:bg-muted/30 focus:bg-background border border-border/40 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 w-full min-h-[90px] rounded-lg p-3 text-foreground transition-all outline-none">
                {localTask.description}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 py-4 border-y border-border/60">
              {/* Status */}
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  Status
                </span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="relative flex-1">
                    <select
                      name="status"
                      value={localTask.status || "Pending"}
                      onChange={(e) =>
                        handleFieldChange("status", e.target.value as Status)
                      }
                      className="w-full h-9 rounded-md border border-border/80 px-2.5 bg-background text-xs font-medium focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer appearance-none transition"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Process">In Process</option>
                      <option value="Done">Done</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
                      {getStatusIcon(localTask.status || "Pending")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                  Due Date
                </span>
                <div className="flex-1">
                  <input
                    name="due_date"
                    type="date"
                    value={localTask.due_date}
                    onChange={(e) =>
                      handleFieldChange("due_date", e.target.value)
                    }
                    className="w-full h-9 rounded-md border border-border/80 px-2.5 bg-background text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer transition"
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  Priority
                </span>
                <div className="flex-1">
                  <select
                    value={localTask.priority}
                    disabled
                    className={`w-full h-9 rounded-md border px-2.5 bg-background text-xs font-semibold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer transition disabled:cursor-not-allowed  ${getPriorityColor(localTask.priority)}`}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Assignee */}
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-muted-foreground/60" />
                  Assignee
                </span>
                <div className="flex-1">
                  <select
                    value={localTask.assignee || ""}
                    disabled
                    className="w-full h-9 rounded-md border border-border/80 px-2.5 bg-background text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer transition disabled:cursor-not-allowed disabled:bg-muted-foreground/5 text-muted-foreground/60"
                  >
                    <option value="">Unassigned</option>
                    <option value="James Smith">James Smith</option>
                    <option value="Eddie Lake">Eddie Lake</option>
                    <option value="Sarah Chen">Sarah Chen</option>
                  </select>
                </div>
              </div>

              {/* Workspace Selector */}
              <div className="flex items-center gap-4 col-span-2">
                <span className="w-20 text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  Workspace
                </span>
                <div className="flex-1">
                  <select
                    value={localTask.workspace || ""}
                    disabled
                    className="w-full h-9 rounded-md border border-border/80 px-2.5 bg-background text-xs focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none cursor-pointer transition disabled:cursor-not-allowed disabled:bg-muted-foreground/5 text-muted-foreground/60"
                  >
                    <option value="">No Workspace</option>
                    <option value="Workspace 1">Workspace 1</option>
                    <option value="Workspace 2">Workspace 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Task Breakdown Section */}
            <div className="space-y-4 mt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 animate-pulse" />
                  AI Task Breakdown
                </label>

                {subtasks.length === 0 && !isGenerating && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateAIBreakdown}
                    className="h-8 text-xs font-semibold text-primary hover:text-primary hover:bg-primary/5 border-primary/20 hover:border-primary/40 rounded-lg cursor-pointer bg-gradient-to-r from-primary/5 to-purple-500/5 hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300"
                  >
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 animate-spin-slow text-primary" />
                    Generate Breakdown
                  </Button>
                )}
              </div>

              {/* Loading Generator State */}
              {isGenerating && (
                <div className="border border-border/60 rounded-xl p-5 bg-muted/10 space-y-3 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-xs font-semibold text-foreground">
                      {generationStep}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-purple-500 w-[60%] animate-infinite-loading"></div>
                  </div>
                </div>
              )}

              {/* Generated Subtasks Checklist */}
              {subtasks.length > 0 && (
                <div className="border border-border/60 rounded-xl p-4 bg-muted/5 space-y-4 transition-all">
                  {/* Progress Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">
                        Subtask progress
                      </span>
                      <span className="font-semibold text-primary">
                        {completionPercentage}% Completed
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-primary to-purple-500"
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Subtask list */}
                  <div className="space-y-2.5">
                    {subtasks.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-start gap-2.5 group/subitem py-1 hover:bg-muted/10 px-1 rounded-md transition"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSubtask(sub.id)}
                          className="mt-0.5 text-muted-foreground hover:text-primary transition shrink-0 cursor-pointer"
                        >
                          {sub.completed ? (
                            <CheckSquare className="h-4.5 w-4.5 text-primary fill-primary/10" />
                          ) : (
                            <Square className="h-4.5 w-4.5" />
                          )}
                        </button>
                        <span
                          className={`text-xs flex-1 text-foreground leading-normal ${sub.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {sub.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteSubtask(sub.id)}
                          className="opacity-0 group-hover/subitem:opacity-100 text-muted-foreground hover:text-destructive p-0.5 rounded transition shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Manual add subtask */}
                  <form
                    onSubmit={handleAddSubtask}
                    className="flex gap-2 pt-2 border-t border-border/40"
                  >
                    <input
                      type="text"
                      placeholder="Add custom subtask..."
                      value={newSubtaskTitle}
                      onChange={(e) => setNewSubtaskTitle(e.target.value)}
                      className="flex-1 h-8 rounded-lg border border-border/80 px-2.5 text-xs bg-background focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-8 px-2.5 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: 30% Comment Section (col-span-3) */}
          <div className="col-span-3 bg-muted/15 flex flex-col h-full overflow-hidden">
            {/* Comments Header */}
            <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Comments
              </h3>
              <Badge
                variant="secondary"
                className="h-5 min-w-5 flex items-center justify-center p-0 text-[10px] rounded-full"
              >
                {comments.length}
              </Badge>
            </div>

            {/* Scrollable Comment List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="space-y-1 bg-card border border-border/50 rounded-xl p-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px] font-bold bg-primary/10 text-primary">
                        {comment.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-foreground truncate">
                        {comment.author}
                      </h4>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/90 pl-8 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Form Pinned at the bottom */}
            <div className="p-4 border-t border-border bg-card">
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full text-xs p-2.5 rounded-lg border border-border/80 bg-background resize-none h-18 focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none text-foreground"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment(e);
                    }
                  }}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    className="h-8 px-3 rounded-lg text-xs font-semibold gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="h-3 w-3" />
                    Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
