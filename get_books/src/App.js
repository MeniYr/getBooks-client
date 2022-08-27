import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { myBooks } from "./shared/redux/features/bookSlice";
import { getCurrentUser } from "./shared/redux/features/usersSlice";
import AppRoutes from "./shared/routes/appRoutes";

function App() {
  // const dispatch = useDispatch();
  // const user = useSelector(getCurrentUser);
  // useEffect(() => {
  //   console.log(user._id);
  //   user?._id && dispatch(myBooks(user?._id));
  // }, []);

  return (
    <main className="App">
      <AppRoutes />
    </main>
  );
}

export default App;
