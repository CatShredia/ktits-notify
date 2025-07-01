import { useState } from "react";
import "./App.css";
import personData from "./data/person.json";
import catimage from '/catimage.png'

function App() {
  return (
    <>
    <div>
    <h1 className="title">Резюме</h1>
      <div className="cards">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
    </>
  )
}

function Card() {
  return (
    <>
      <a className="card" href="#">
        <div className="card-left">
        <h1>{personData.Человек.ФИО}</h1>
        <p>Возраст: {personData.Человек["Возраст"]}</p>
        <p>Email: {personData.Человек["Электронная почта"]}</p>
        <p>Образование: {personData.Человек["Образование"]}</p>
        <p>Личные качества: {personData.Человек["Личные качества"]}</p>
        <p>Навыки: {personData.Человек["Навыки"]}</p>
        </div>
        <div className="card-right">
          <img src={catimage} alt="q" />
        </div>
      </a>
    </>
  )
}

export default App;
