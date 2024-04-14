import ReactDOM from "react-dom/client"
import "./index.css"
import ReduxProvider from "./redux/ReduxProvider"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
)
