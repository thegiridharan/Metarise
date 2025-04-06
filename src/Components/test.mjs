import useLocalStorage from "../hooks/useLocalStorage";

const [theme, setTheme] = useLocalStorage("theme", "dark");

console.log(theme);
setTheme("light");
console.log(theme);
