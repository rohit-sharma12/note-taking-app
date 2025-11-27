import { useState } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";

const EditContent = ({ onClose, type, getAllNotes, noteData }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tag, setTag] = useState(noteData?.tag || "");
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/note/add-note", {
        title,
        content,
        tag,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/api/note/edit-note/" + noteId, {
        title,
        content,
        tag,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) return setError("Please enter the title");
    if (!content) return setError("Please enter the content");

    setError("");

    if (type === "edit") editNote();
    else addNewNote();
  };

  return (
    <div className="p-3 sm:p-6 md:p-8 relative w-[95%] sm:w-[95%] md:w-[500px] max-w-full mx-auto">
      <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 cursor-pointer hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-600" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600">TITLE</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-semibold text-slate-900 outline-none bg-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label className="text-xs font-semibold text-slate-600">CONTENT</label>

        <textarea
          className="text-sm text-slate-900 outline-none bg-slate-100 p-3 rounded-lg leading-relaxed focus:ring-2 focus:ring-blue-500 transition-all"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label className="text-xs font-semibold text-slate-600">TAG</label>

        <input
          type="text"
          className="text-sm text-slate-900 outline-none bg-slate-100 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 transition-all"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="bg-blue-600 text-white font-medium mt-6 w-full py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-all"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default EditContent;
