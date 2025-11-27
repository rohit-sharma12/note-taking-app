
const ProfileInfo = ({ userInfo, onLogout }) => {

    const getInitials = (name) => {
        if (!name) return "";

        const words = name.split(" ");
        let initials = "";

        for (let i = 0; i < Math.min(words.length, 2); i++) {
            initials += words[i][0];
        }

        return initials.toLowerCase();
    }
    return (
        <div className='flex items-center gap-3'>
            <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{getInitials(userInfo?.fullName)}</div>

            <div>
                <p className='text-sm font-medium'>{userInfo?.fullName}</p>
                <button onClick={onLogout} className='txet-sm underline text-slate-700'>Logout</button>
            </div>
        </div>
    )
}

export default ProfileInfo
