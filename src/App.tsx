import { ToastContainer } from "react-toastify"
import Form from "./components/Form"
import List from "./components/List"
import { TiAdjustBrightness } from "react-icons/ti";
import { TiAdjustContrast } from "react-icons/ti";
import { useThemeStore } from "./store/themeStore";
import { useCallback } from "react";
function App() {
  const { toggleTheme, theme } = useThemeStore()
  const setThemeInScreen = useCallback(() => {
    if (theme) {
      document.documentElement.classList.add(theme);
    }
  }, [theme])
  setThemeInScreen()
  const themeChange = () => {
    toggleTheme()
  }
  return (
    <div className="dark:bg-gray-900 h-screen transition-all duration-1000 ">
      <div className="container mx-auto flex justify-end px-2 py-2 ">
        <button onClick={themeChange} className="px-5 py-2 mr-10  bg-black dark:bg-white rounded-full hover:cursor-pointer shadow shadow-gray-700 dark:shadow-white transition-all duration-1000">
          {(theme !== 'dark') ?
            <TiAdjustContrast className="text-white text-xl" />
            : <TiAdjustBrightness className="text-black text-xl" />
          }
        </button>
      </div>
      <h1 className="font-black text-center text-4xl mt-4 dark:text-white transition-all duration-1000">Seguimientos de Pacientes<span className="text-violet-700">Veterinaria</span></h1>
      <div className="container mx-auto flex flex-col justify-around gap-4 md:flex-row ">
        <Form></Form>
        <List></List>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
