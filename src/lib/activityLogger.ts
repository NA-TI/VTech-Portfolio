// Activity Logger Utility
// This utility helps log admin activities consistently across the application

interface ActivityLogData {
  action: string;
  description: string;
  entity_type:
    | "project"
    | "skill"
    | "content"
    | "profile"
    | "message"
    | "settings"
    | "system";
  entity_id?: string;
  metadata?: any;
}

export async function logActivity(
  activityData: ActivityLogData
): Promise<void> {
  try {
    const response = await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      console.error("Failed to log activity:", activityData);
    }
  } catch (error) {
    console.error("Activity logging error:", error);
  }
}

// Predefined activity templates for common actions
export const ActivityTemplates = {
  // Project activities
  projectCreated: (projectTitle: string, projectId: string) => ({
    action: "create",
    description: `Created new project: ${projectTitle}`,
    entity_type: "project" as const,
    entity_id: projectId,
    metadata: { project_title: projectTitle },
  }),

  projectUpdated: (
    projectTitle: string,
    projectId: string,
    changes: string[]
  ) => ({
    action: "update",
    description: `Updated project: ${projectTitle}`,
    entity_type: "project" as const,
    entity_id: projectId,
    metadata: { project_title: projectTitle, changes },
  }),

  projectDeleted: (projectTitle: string, projectId: string) => ({
    action: "delete",
    description: `Deleted project: ${projectTitle}`,
    entity_type: "project" as const,
    entity_id: projectId,
    metadata: { project_title: projectTitle },
  }),

  // Skill activities
  skillCreated: (skillTitle: string, skillId: string) => ({
    action: "create",
    description: `Added new skill: ${skillTitle}`,
    entity_type: "skill" as const,
    entity_id: skillId,
    metadata: { skill_title: skillTitle },
  }),

  skillUpdated: (skillTitle: string, skillId: string, changes: string[]) => ({
    action: "update",
    description: `Updated skill: ${skillTitle}`,
    entity_type: "skill" as const,
    entity_id: skillId,
    metadata: { skill_title: skillTitle, changes },
  }),

  skillDeleted: (skillTitle: string, skillId: string) => ({
    action: "delete",
    description: `Deleted skill: ${skillTitle}`,
    entity_type: "skill" as const,
    entity_id: skillId,
    metadata: { skill_title: skillTitle },
  }),

  // Content activities
  contentUpdated: (section: string, changes: string[]) => ({
    action: "update",
    description: `Updated ${section} content`,
    entity_type: "content" as const,
    metadata: { section, changes },
  }),

  // Profile activities
  profileUpdated: (changes: string[]) => ({
    action: "update",
    description: "Updated profile information",
    entity_type: "profile" as const,
    metadata: { changes },
  }),

  // Message activities
  messageReplied: (messageId: string) => ({
    action: "update",
    description: "Replied to contact message",
    entity_type: "message" as const,
    entity_id: messageId,
    metadata: { action: "reply" },
  }),

  messageDeleted: (messageId: string) => ({
    action: "delete",
    description: "Deleted contact message",
    entity_type: "message" as const,
    entity_id: messageId,
  }),

  // Settings activities
  settingsUpdated: (changes: string[]) => ({
    action: "update",
    description: "Updated site settings",
    entity_type: "settings" as const,
    metadata: { changes },
  }),

  // System activities
  userLogin: () => ({
    action: "login",
    description: "Admin logged in successfully",
    entity_type: "system" as const,
    metadata: { timestamp: new Date().toISOString() },
  }),

  userLogout: () => ({
    action: "logout",
    description: "Admin logged out",
    entity_type: "system" as const,
    metadata: { timestamp: new Date().toISOString() },
  }),

  fileUploaded: (fileName: string, fileSize: string, fileType: string) => ({
    action: "upload",
    description: `Uploaded file: ${fileName}`,
    entity_type: "system" as const,
    metadata: { file_name: fileName, file_size: fileSize, file_type: fileType },
  }),

  // Custom activity creator
  custom: (
    action: string,
    description: string,
    entityType: ActivityLogData["entity_type"],
    entityId?: string,
    metadata?: any
  ) => ({
    action,
    description,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
  }),
};

// Helper function to log activities with templates
export async function logActivityWithTemplate(
  template: ActivityLogData
): Promise<void> {
  await logActivity(template);
}

// Batch logging for multiple activities
export async function logBatchActivities(
  activities: ActivityLogData[]
): Promise<void> {
  for (const activity of activities) {
    await logActivity(activity);
  }
}
