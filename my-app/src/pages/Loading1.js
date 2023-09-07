import { useLocation } from "react-router-dom";

import styles from "./Loading1.module.css";
import eagle from "../assets/Loading1/eagle.svg";
import tiger from "../assets/Loading1/tiger.svg";
import mystery from "../assets/Loading1/mystery.svg";
import Back from "../components/Back/Back";

const Loading1 = () => {
  const location = useLocation();
  const { socket, opData, myData, roomId } = location.state || {};
  const userId = myData.userId;

  let myNickname = myData.nickname;
  let myUniv = myData.univ;
  let myWins = myData.wins;
  let myTotal = myData.total;
  let myLose = myTotal - myWins;

  let opNickname = opData.nickname;
  let opUniv = opData.univ;
  let opWins = opData.wins;
  let opTotal = opData.total;
  let opLose = opTotal - opWins;

  socket.on("activateGame", (data) => {
    if (data.state === "success") {
      //go to game1 ''choice''
    }
  });
  const onClick = (e) => {
    e.preventDefault();
    socket.emit("startGame", { roomId, userId });
  };

  return (
    <>
      <div>
        <div>
          <div>
            <div>{opNickname}</div>
            <div>
              {!opNickname
                ? "???전 ???승 ???패"
                : `${opTotal}전 ${opWins}승 ${opLose}패`}
            </div>
            {/* 이미지 맞는 것 보여주기 */}
            {!opNickname ? (
              <img src={mystery} alt="mystery" />
            ) : opUniv === "korea" ? (
              <img src={tiger} alt="tiger" />
            ) : (
              <img src={eagle} alt="eagle" />
            )}
          </div>

          <div>
            <div>{myNickname}</div>
            <div>
              {myTotal}전 {myWins}승 {myLose}패
            </div>
            {myUniv === "korea" ? (
              <img src={tiger} alt="tiger" />
            ) : (
              <img src={eagle} alt="eagle" />
            )}
          </div>
        </div>
        <div>
          {opNickname}(이)가
          <br />
          승부를 걸어왔다!
        </div>

        <Back onClick={onClick} />
      </div>
    </>
  );
};

export default Loading1;
