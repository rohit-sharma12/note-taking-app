import { useState } from "react";
import { MdClose } from "react-icons/md";

const EditContent = ({ onClose, type, noteData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [error, setError] = useState(null);

  const addNewNote = async () => { };
  const editNote = async () => { };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  }

  return (
    <div className="p-4 relative">
      <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 cursor-pointer hover:bg-slate-50" onClick={onClose}>
        <MdClose className="text-xl text-slate-600" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-600">TITLE</label>

        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          className="text-xl font-semibold text-slate-900 outline-none bg-slate-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Go To Study"
        />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label className="text-xs font-semibold text-slate-600">CONTENT</label>

        <textarea
          className="text-sm text-slate-900 outline-none bg-slate-100 p-3 rounded-lg leading-relaxed focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Write your note content..."
          rows={8}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        ></textarea>
      </div>


      <div className="flex flex-col gap-2 mt-6">
        <label className="text-xs font-semibold text-slate-600">TAGS</label>

        <input
          type="text"
          className="text-sm text-slate-900 outline-none bg-slate-100 rounded-lg p-2 focus:ring-2 focus:ring-blue-500transition-all"
          placeholder="#study"
          value={tags}
          onChange={({ target }) => setTags(target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="bg-blue-600 text-white font-medium mt-6 w-full py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-all"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default EditContent;
