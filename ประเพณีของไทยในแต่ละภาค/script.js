document.querySelector("nav").innerHTML =
    `
<nav>
            <ul>
                <li><a href="./index.html">หน้าหลัก</a></li>
                <li><a href="#home">แกลเลอรี่</a>
                    <ul class="dropdown">
                        <li><a href="#set">ชุดประจำภาค</a></li>
                        <li><a href="#images">รูปประเพณีของไทย</a></li>
                    </ul>
                </li>
                <li><a href="./ภาคเหนือ.html">ภาค เหนือ</a></li>
                <li><a href="./ภาคอีสาน.html">ภาค อีสาน</a></li>
                <li><a href="./ภาคกลาง.html">ภาค กลาง</a></li>
                <li><a href="./ภาคใต้.html">ภาค ใต้</a></li>
            </ul>
        </nav>
`;
document.querySelector("#toTop").innerHTML =
    `
<a href="#home">To Top</a>
`;
document.querySelector("footer").innerHTML =
    `
<p>&copy; - ประเพณีของไทย &reg;</p>
`;