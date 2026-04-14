import "./FooterPC.css";
import { useTheme } from "../contexts/ThemeContext";

function FooterPC() {
  const { isDark } = useTheme();

  return (
    <footer className={isDark ? "footer-dark" : "footer-white"}>
      <div className="footer-nav">
        <a className="logo-footer">storé</a>
        <ul className="footer-nav-content">
          <li>
            <a href="">iPad</a>
          </li>
          <li>
            <a href="">iPhone</a>
          </li>
          <li>
            <a href="">Watch</a>
          </li>
          <li>
            <a href="">AirPods</a>
          </li>
        </ul>
      </div>
      <div className={isDark ? "footer-dark-txt" : "footer-white-txt"}>
        <p>
          Лорем ипсум долор сит амет, иудицабит инцидеринт ин иус. Ин
          <br />
          яуис алияуид яуаестио усу, ат долоре еуисмод лаборамус еам,
          <br />
          ет цетерос перципитур ест. Поссе аеяуе диссентиас еа хис
          <br />, новум алтерум ан еум. Яуод малуиссет еос еу. Сумо дебитис
          <br />
          сенсибус нам те, ет партиендо цонституам вих.
          <br />
          <br />
          Яуо тамяуам номинави репудиаре ет, иус ан нибх аудире
          <br />
          ратионибус. Нибх дицит ет дуо, мелиус тритани яуо ут, ут
          <br />
          нострум цопиосае яуаестио сеа. Еам ид ассуеверит
          <br />
          интерессет, не аудиам лабитур маиестатис яуо, ан оптион
          <br />
          лаборамус адверсариум мел. Вим алтера поссит бландит ид.
          <br />
          Меа цу сале мовет ехплицари.
        </p>
        <p>
          Все права не защищены.
          <br />
          Они никогда не будут
          <br />
          защищены.
        </p>
      </div>
    </footer>
  );
}

export default FooterPC;
