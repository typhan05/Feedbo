const getBoardIdFromUrl = () => {
  const currentPath = window.location.pathname;
  const lastTextCurrentPath = currentPath.substring(
    currentPath.length - 1,
    currentPath.length
  );
  const defineUrlBoard = window.bigNinjaVoteWpdata.defineUrlBoard;
  if (lastTextCurrentPath === "/") {
    return currentPath.substring(defineUrlBoard.length, currentPath.length - 1);
  } else {
    return currentPath.substring(defineUrlBoard.length, currentPath.length);
  }
};

export {getBoardIdFromUrl };
