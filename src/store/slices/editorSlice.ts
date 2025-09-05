import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { EditorDoc, EditorStatus } from '@/src/types/editor';

export interface EditorState extends EditorDoc {
  lastSavedAt?: number;
}

const initialState: EditorState = {
  slug: '',
  title: '',
  body: '',
  status: 'draft',
  meta: { tags: [], categories: [] }
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    hydrate(_state, action: PayloadAction<EditorState>) {
      return action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setSlug(state, action: PayloadAction<string>) {
      state.slug = action.payload;
    },
    setBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setStatus(state, action: PayloadAction<EditorStatus>) {
      state.status = action.payload;
    },
    setExcerpt(state, action: PayloadAction<string | undefined>) {
      state.meta.excerpt = action.payload;
    },
    addTag(state, action: PayloadAction<string>) {
      if (!state.meta.tags.includes(action.payload)) state.meta.tags.push(action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      state.meta.tags = state.meta.tags.filter((t) => t !== action.payload);
    },
    addCategory(state, action: PayloadAction<string>) {
      if (!state.meta.categories.includes(action.payload)) state.meta.categories.push(action.payload);
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.meta.categories = state.meta.categories.filter((c) => c !== action.payload);
    },
    setCover(state, action: PayloadAction<string | undefined>) {
      state.meta.coverImage = action.payload;
    },
    setLastSavedAt(state, action: PayloadAction<number | undefined>) {
      state.lastSavedAt = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    }
  }
});

export const {
  hydrate,
  setTitle,
  setSlug,
  setBody,
  setStatus,
  setExcerpt,
  addTag,
  removeTag,
  addCategory,
  removeCategory,
  setCover,
  setLastSavedAt,
  reset
} = editorSlice.actions;

export default editorSlice.reducer;
