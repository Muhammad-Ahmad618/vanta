"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Mail,
  AlertTriangle,
  UserCheck,
  Clock,
  MessageSquare,
} from "lucide-react";

type NotificationSettings = {
  inApp: boolean;
  email: boolean;
  atRiskTask: boolean;
  taskAssigned: boolean;
  taskDueSoon: boolean;
  commentsMentions: boolean;
};

const defaultSettings: NotificationSettings = {
  inApp: true,
  email: false,
  atRiskTask: true,
  taskAssigned: true,
  taskDueSoon: true,
  commentsMentions: true,
};

type NotificationRowProps = {
  id: keyof NotificationSettings;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  badge?: string;
  onCheckedChange: (checked: boolean) => void;
};

function NotificationRow({
  id,
  icon,
  title,
  description,
  checked,
  disabled = false,
  badge,
  onCheckedChange,
}: NotificationRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 py-3.5">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="mt-0.5 shrink-0 text-muted-foreground">{icon}</span>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Label
              htmlFor={id}
              className="text-sm font-medium text-foreground cursor-pointer"
            >
              {title}
            </Label>
            {badge && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="shrink-0"
      />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-2">
      {label}
    </p>
  );
}

export function Notifications() {
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);

  const update = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">
          Notification preferences
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Choose how and when Vanta notifies you.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // call your PATCH /api/users/me/preferences here
        }}
      >
        <div className="px-6 divide-y divide-border">
          {/* Delivery */}
          <div className="py-5">
            <SectionLabel label="Delivery" />
            <div className="divide-y divide-border">
              <NotificationRow
                id="inApp"
                icon={<Bell size={15} />}
                title="In-app notifications"
                description="Alerts inside Vanta when tasks are updated or need attention."
                checked={settings.inApp}
                onCheckedChange={(v) => update("inApp", v)}
              />
              <NotificationRow
                id="email"
                icon={<Mail size={15} />}
                title="Email notifications"
                description="Get important updates in your inbox when away from the app."
                checked={settings.email}
                disabled
                badge="Coming soon"
                onCheckedChange={(v) => update("email", v)}
              />
            </div>
          </div>

          {/* Task alerts */}
          <div className="py-5">
            <SectionLabel label="Task alerts" />
            <div className="divide-y divide-border">
              <NotificationRow
                id="atRiskTask"
                icon={<AlertTriangle size={15} className="text-destructive" />}
                title="At-risk task alerts"
                description="Notified when a task is overdue or at risk of missing its deadline."
                checked={settings.atRiskTask}
                onCheckedChange={(v) => update("atRiskTask", v)}
              />
              <NotificationRow
                id="taskAssigned"
                icon={<UserCheck size={15} />}
                title="Task assigned to me"
                description="Alert when a teammate assigns a task to you."
                checked={settings.taskAssigned}
                onCheckedChange={(v) => update("taskAssigned", v)}
              />
              <NotificationRow
                id="taskDueSoon"
                icon={<Clock size={15} />}
                title="Due date reminders"
                description="Reminders before tasks are due so nothing slips through."
                checked={settings.taskDueSoon}
                onCheckedChange={(v) => update("taskDueSoon", v)}
              />
            </div>
          </div>

          {/* Activity */}
          <div className="py-5">
            <SectionLabel label="Activity" />
            <div className="divide-y divide-border">
              <NotificationRow
                id="commentsMentions"
                icon={<MessageSquare size={15} />}
                title="Comments and mentions"
                description="Notify when someone mentions you or replies to a thread you're in."
                checked={settings.commentsMentions}
                onCheckedChange={(v) => update("commentsMentions", v)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-border bg-muted/30">
          <Button
            type="button"
            variant="outline"
            className="rounded-md cursor-pointer"
            onClick={() => setSettings(defaultSettings)}
          >
            Reset
          </Button>
          <Button type="submit" className="rounded-md cursor-pointer">
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}