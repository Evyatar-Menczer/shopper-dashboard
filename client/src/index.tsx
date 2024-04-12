import ReactDOM from "react-dom/client"
import "./index.css"
import ReduxProvider from "./redux/ReduxProvider"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
console.log("root", root)
root.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
)
