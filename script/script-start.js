function resetWindow(){window.location.reload(!0),document.body.innerHTML=`
    <div class="fixed inset-0 flex flex-col justify-center items-center text-center min-h-screen bg-gradient-to-b from-[#FFFFFF] dark:from-[#000000] to-[#F5F5F5] dark:to-[#111827] text-[#0D0D0D] dark:text-zinc-500">
        <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#409EFE] mx-auto"></div>
        <h2 class="mt-4">Loading...</h2>
        <p>Your adventure is about to begin</p>
    </div>
            `}document.body.innerHTML+=`
    <div id="progressbar" role="progressbar" aria-hidden="true" class="fixed inset-x-0 top-0 left-0 z-50 h-1 opacity-0">
        <div class="h-full bg-gradient-to-r from-[#84D4FA] to-[#409EFE] transition-all duration-1000 ease-in-out w-0"></div>
    </div>
    `,document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("progressbar").firstElementChild;e.style.width="0";let t=0,n=setInterval(()=>{t+=1,e.style.width=t+"%",e.parentElement.style.opacity="1",t>=100&&(clearInterval(n),setTimeout(()=>{e.parentElement.style.opacity="0"},500))},25)});const screenSize=`Your screen size: ${window.innerWidth}W ⨉ ${window.innerHeight}H`;function checkTimeAndToggleDisplay(){let e=new Date,t=e.getMonth();11===t?document.getElementById("decor-container").style.display="flex":document.getElementById("decor-container").style.display="none"}document.body.innerHTML+=`
    <a class="-animationShow-x fixed top-0 right-0 opacity-75 z-50 hover:opacity-100 ease-in-out duration-300"
        target="_blank" href="https://github.com/centered101">
        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 250 250" fill="#121212"
            data-v-14a7b7ba="">
            <path d="M0 0l115 115h15l12 27 108 108V0z" fill="#D7D7D7"></path>
            <path class="octo-arm" d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16"
                style="transform-origin: 130px 106px;"></path>
            <path class="octo-body"
                d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0 5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41 2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z">
            </path>
        </svg>
    </a>
    <footer role="complementary" class="truncate text-sm my-4 text-center">
        <p>${screenSize}</p>
        <p class="first-letter:text-[#409EFE] truncate">Version:
            <span id="version"></span>
        </p>
        <p class="first-letter:text-[#409EFE] truncate">&copy; ${new Date().getFullYear()}
            <span title="Portfolio Centered101" class="text-[#409EFE] underline-offset-1">
            <a href="https://portfolio-centered101.netlify.app/">Centered101</a></span>— All Rights Reserved.
        </p>
    </footer>
    `,document.body.innerHTML+=`
    <style>
        .hanging-decor {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 20px;
        }
    
        .hanging-decor img {
            width: 50px;
            height: 50px;
            clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
            border-radius: 8px;
            animation: swing 5000ms ease-in-out infinite;
        }
    
        @keyframes swing {
            0%,
            100% {
                transform: translateY(0) rotate(-10deg);
            }
            50% {
                transform: translateY(10px) rotate(10deg);
            }
        }
    </style>
    
    <div id="decor-container" class="hanging-decor opacity-80" style="display: none;">
        <img src="https://via.placeholder.com/50/FF7070/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
        <img src="https://via.placeholder.com/50/1Ed760/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
        <img src="https://via.placeholder.com/50/409EFE/FFFFFF?text=" draggable="false" oncontextmenu="return false;" alt="Decor">
    </div>
    `,setInterval(checkTimeAndToggleDisplay,1e3);const head=document.createElement("head"),metaTags=[{httpEquiv:"content-type",content:"text/html; charset=utf-8"},{name:"keywords",content:"HTML,CSS,XML,JavaScript,Centered101"},{name:"author",content:"listing directory — Centered101"},{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{httpEquiv:"X-UA-Compatible",content:"IE=edge"},{name:"title",content:"listing directory — Centered101"},{name:"description",content:"โปรเจคต่างๆ ที่ผมสร้าง ส่งให้คุณตรวจ"},{property:"og:type",content:"website"},{property:"og:url",content:"https://project-test-submission.netlify.app/"},{property:"og:title",content:"listing directory — Centered101"},{property:"og:description",content:"โปรเจคต่างๆ ที่ผมสร้าง ส่งให้คุณตรวจ"},{property:"og:image",content:"/images/Tes-D.png"},{property:"twitter:card",content:"summary_large_image"},{property:"twitter:url",content:"https://project-test-submission.netlify.app/"},{property:"twitter:title",content:"listing directory — Centered101"},{property:"twitter:description",content:"โปรเจคต่างๆ ที่ผมสร้าง ส่งให้คุณตรวจ"},{property:"twitter:image",content:"/images/Tes-D.png"},];metaTags.forEach(e=>{let t=document.createElement("meta");Object.entries(e).forEach(([e,n])=>t.setAttribute(e,n)),head.appendChild(t)});const title=document.createElement("title");title.textContent="listing directory/",head.appendChild(title);const linkTags=[{rel:"icon",type:"image/png",href:"/images/Tes-D.png"},{rel:"stylesheet",href:"/style/style-start.css"},{rel:"stylesheet",href:"/style/style.css"},];linkTags.forEach(e=>{let t=document.createElement("link");Object.entries(e).forEach(([e,n])=>t.setAttribute(e,n)),head.appendChild(t)});const scriptTags=[{src:"https://cdn.tailwindcss.com"},{src:"/animation/script.js"},];function $(e){var t="string"==typeof e?document.getElementById(e):e;return t.on=function(e,n){"content loaded"==e&&(e=window.attachEvent?"load":"DOMContentLoaded"),t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)},t.all=function(e){return $(t.querySelectorAll(e))},t.each=function(e){for(var n=0,r=t.length;n<r;++n)e($(t[n]),n)},t.getClasses=function(){return this.getAttribute("class").split(/\s+/)},t.addClass=function(e){var n=this.getAttribute("class");t.setAttribute("class",n?n+" "+e:e)},t.removeClass=function(e){var t=this.getClasses().filter(function(t){return t!=e});this.setAttribute("class",t.join(" "))},t}function search(){var e=$("search").value.toLowerCase();$("files").all("a").each(function(t){var n=t.textContent.toLowerCase();".."!=n&&(e.length&&~n.indexOf(e)?t.addClass("highlight"):t.removeClass("highlight"))})}function applyTheme(e){"dark"===e?document.documentElement.setAttribute("data-theme","dark"):document.documentElement.setAttribute("data-theme","light")}scriptTags.forEach(e=>{let t=document.createElement("script");Object.entries(e).forEach(([e,n])=>t.setAttribute(e,n)),head.appendChild(t)}),document.documentElement.prepend(head),$(window).on("content loaded",function(){$("search").on("keyup",search)});const userPrefersDark=window.matchMedia("(prefers-color-scheme: dark)");applyTheme(userPrefersDark.matches?"dark":"light"),userPrefersDark.addEventListener("change",e=>{applyTheme(e.matches?"dark":"light")});