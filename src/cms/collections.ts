import type { EntityCollection } from "firecms";

export const postsCollection: EntityCollection = {
  name: "Posts",
  path: "posts",
  description: "Blog posts managed in FireCMS",
  group: "Content",
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
    read: true
  }),
  properties: {
    title: {
      name: "Title",
      dataType: "string",
      validation: { required: true }
    },
    slug: {
      name: "Slug",
      dataType: "string",
      description: "URL identifier",
      validation: { required: true }
    },
    body: {
      name: "Body",
      dataType: "string",
      description: "Markdown content",
      markdown: true
    },
    published: {
      name: "Published",
      dataType: "boolean",
      defaultValue: false
    },
    createdAt: {
      name: "Created at",
      dataType: "date",
      autoValue: "on_create"
    },
    updatedAt: {
      name: "Updated at",
      dataType: "date",
      autoValue: "on_update"
    },
    authorUid: {
      name: "Author UID",
      dataType: "string",
      readOnly: true,
      hideFromCollection: true
    },
    authorName: {
      name: "Author name",
      dataType: "string",
      readOnly: true,
      hideFromCollection: true
    }
  }
};

export const navigationCollections = [postsCollection];

