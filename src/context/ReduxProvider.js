import { Provider } from "react-redux";
import { store } from "../utils/reduxState";

const ReduxProvider = ({ children }) => {
    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
};

export default ReduxProvider;