import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
    title,
    date,
    content,
    tags, // now a string instead of array
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
}) => {
    return (
        <div
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)]">

            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-base font-semibold text-slate-800">{title}</h6>
                    <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
                </div>

                <MdOutlinePushPin
                    className={`text-2xl cursor-pointer transition-all duration-200 ${isPinned
                        ? "text-blue-600 drop-shadow-sm"
                        : "text-slate-400 hover:text-blue-500"
                        }`}
                    onClick={onPinNote}
                />
            </div>

            {/* Content */}
            <p className="text-sm text-slate-600 mt-3 leading-relaxed tracking-wide">
                {content?.slice(0, 100) || "No content available..."}
            </p>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-4">
                {/* Tags - simple text now */}
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                    {tags ? `${tags}` : "No tags"}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <MdCreate
                        className="text-xl text-slate-400 cursor-pointer hover:text-green-600 hover:scale-110transition-all"
                        onClick={onEdit}
                    />

                    <MdDelete
                        className="text-xl text-slate-400 cursor-pointer hover:text-red-500 hover:scale-110transition-all"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteCard;
