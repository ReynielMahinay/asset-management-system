function ActionMenu({ action, actionIcon }) {
  return (
    <div className="flex flex-row gap-4 justify-center items-center">
      {actionIcon.map(({ id, Icon }) => (
        <span
          key={id}
          onClick={action?.[id]}
          className={`text-zinc-500 hover:bg-gray-100 p-1.5 rounded-lg ${
            id === "delete" ? "hover:text-red-500" : ""
          }`}
        >
          <Icon className={`cursor-pointer `} size={15} />
        </span>
      ))}
    </div>
  );
}

export default ActionMenu;
