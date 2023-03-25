import { DataCard } from "./Cmps/DataCard/DataCard";
import Styles from "./App.module.scss"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


function App() {
  return (
    <div className={Styles.MainContainer}>
      <RecoilRoot>
        <DataCard />
      </RecoilRoot>
    </div>
  );
}

export default App;
