import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivoDate, data) => {
  const beginTime = new Date(
    pivoDate.getFullYear(),
    pivoDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivoDate.getFullYear(),
    pivoDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const [pivoDate, setPivoDate] = useState(new Date());
  const data = useContext(DiaryStateContext);

  const monthlyData = getMonthlyData(pivoDate, data);

  const onIncreaseMonth = () => {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivoDate.getFullYear()}년 ${pivoDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
