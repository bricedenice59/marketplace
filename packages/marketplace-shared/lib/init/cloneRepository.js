import child_process from "child_process";

export default (repo = "") => {
  if (repo != "") {
    child_process.execSync(`git clone ${repo}`);
  }
};
