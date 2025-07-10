import { Link } from "react-router";
import Banner from "../components/Banner";

import bannerImg from '../assets/image.png'
import historyImg from '../assets/image copy.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    return (
        <>
            <section className="section-banner container">
                <Banner SloganContent={
                    <>
                        Ближе, чем супермаркет.
                        <br />
                        Вкуснее, чем импорт!
                    </>
                }
                    buttonContent="Я хочу эчпочмак!"
                    imgObject={bannerImg}>
                </Banner>
            </section>

            <section className="section-history container">
                <div className="content">
                    <h2>О нас</h2>
                    <p><span>«Туган Аш»</span> родился из простой идеи вкус детства, тепло родной земли и забота о близких — всё это должно быть доступно каждому. <br /><br />

                        Мы начали с небольшого фермерского круга в Татарстане, где бабушки пекут эчпочмаки по старинным рецептам, а деды варят настоящий катык. Мы знали: эти продукты лучше, чем магазинные, ведь в них вложены любовь, труд и честность.<br /><br />
                        Сейчас <span>«Туган Аш»</span> — это не просто магазин.Это мост между городом и деревней, между традицией и современностью. <br /><br /> </p>
                    <p className="slogan">
                        Мы доставляем еду с душой — ближе, чем супермаркет, вкуснее, чем импорт.
                    </p>
                </div>
                <img src={historyImg} alt="error" />
            </section>

            <section className="section-contacts container">
                <div className="content">
                    <h2>Наши контакты</h2>
                    <dl>
                        <dt><FontAwesomeIcon icon={faPhone} />+7 (996) 946-75-91</dt>
                        <dt><FontAwesomeIcon icon={faEnvelope} />example@example.ru</dt>
                    </dl>
                </div>
                <div className="map">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6a27dc84b1183e8d03dbd622da24ad1ce61a53b92830c6410b26752b74b503d2&amp;source=constructor" width="529" height="456" frameborder="0"></iframe>
                </div>
            </section>
        </>
    );
}

export default HomePage;