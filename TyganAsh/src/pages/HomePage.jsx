import { Link } from "react-router";
import Banner from "../components/Banner";

import bannerImg from '../assets/image.png'

const HomePage = () => {
    return (
        <div className="container">
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
        </div>
    );
}

export default HomePage;