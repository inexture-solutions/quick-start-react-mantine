export default stagedFilenames =>
  stagedFilenames.length > 0 ? ['bun run validate'] : [];
