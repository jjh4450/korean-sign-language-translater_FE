import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 조준환 
          <span className="hidden md:inline"> | © 2021 IF_O-LANGE</span> —
          <a href="mailto:jjh4450git@gmail.com" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">
            jjh4450git@gmail.com
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://blog.jeje.work" className="text-gray-500 flex items-center justify-center h-4 w-4" target="_blank" rel="noopener noreferrer">
               <BlogIcon />
            </a>
            <a href="https://jeje.work/github" className="ml-3 text-gray-500 flex items-center justify-center h-4 w-4" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
            </a>
            <a href="https://jeje.work/linkedin" className="ml-3 text-gray-500 flex items-center justify-center h-4 w-4" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
            </a>
        </span>
      </div>
    </footer>
  );
};

const BlogIcon = () => (
    <svg fill="currentColor" stroke="currentColor" className="icon" viewBox="0 0 512 512">
      <g transform="translate(0,512) scale(0.1,-0.1)" stroke="none">
        <path d="M2321 5109 c-486 -43 -989 -249 -1376 -564 -114 -92 -294 -274 -384 -387 -229 -287 -417 -675 -495 -1023 -49 -218 -60 -325 -60 -575 0 -250 11 -357 60 -575 79 -355 272 -749 509 -1040 92 -114 274 -294 387 -384 287 -229 675 -417 1023 -495 218 -49 325 -60 575 -60 250 0 357 11 575 60 261 58 603 204 828 353 389 259 688 599 893 1016 165 337 246 658 261 1033 23 598 -168 1183 -545 1672 -84 109 -323 348 -432 432 -528 407 -1164 595 -1819 537z m149 -634 l0 -465 -390 0 c-214 0 -390 2 -390 5 0 2 18 51 41 107 165 414 420 720 667 799 31 10 60 18 65 18 4 1 7 -208 7 -464z m241 449 c249 -73 511 -382 678 -802 23 -56 41 -105 41 -107 0 -3 -175 -5 -390 -5 l-390 0 0 465 c0 256 1 465 3 465 2 0 28 -7 58 -16z m-775 -125 c-156 -166 -307 -432 -420 -741 l-18 -48 -414 0 c-329 0 -414 3 -408 13 4 6 30 39 58 72 255 306 603 553 981 697 82 31 259 86 284 87 7 1 -21 -36 -63 -80z m1277 57 c443 -123 874 -402 1173 -761 28 -33 54 -66 58 -72 6 -10 -79 -13 -408 -13 l-414 0 -18 48 c-113 309 -264 575 -420 741 -42 44 -72 81 -68 81 5 0 48 -11 97 -24z m-1799 -1153 c-62 -256 -124 -679 -124 -851 0 -37 -3 -97 -7 -134 l-6 -68 -553 0 -553 0 5 53 c28 296 63 464 144 682 50 134 108 258 173 368 l51 87 452 0 451 0 -33 -137z m1056 -458 l0 -595 -511 0 -511 0 7 123 c10 187 33 401 61 567 23 137 79 388 105 468 l11 32 419 0 419 0 0 -595z m1029 563 c26 -80 82 -331 105 -468 28 -166 51 -380 61 -567 l7 -123 -511 0 -511 0 0 595 0 595 419 0 419 0 11 -32z m1128 -55 c65 -110 123 -234 173 -368 81 -218 116 -386 144 -682 l5 -53 -553 0 -553 0 -6 68 c-4 37 -7 97 -7 134 0 172 -62 595 -124 851 l-33 137 451 0 452 0 51 -87z m-3344 -1350 c4 -38 7 -98 7 -135 0 -172 62 -595 124 -850 l33 -138 -451 0 -452 0 -51 88 c-65 109 -123 233 -173 367 -81 218 -116 386 -144 683 l-5 52 553 0 553 0 6 -67z m1187 -528 l0 -595 -419 0 -419 0 -11 33 c-26 79 -82 330 -105 467 -28 166 -51 380 -61 568 l-7 122 511 0 511 0 0 -595z m1195 473 c-10 -188 -33 -402 -61 -568 -23 137 -79 388 -105 -467 l-11 -33 -419 0 -419 0 0 595 0 595 511 0 511 0 -7 -122z m1279 70 c-28 -297 -63 -465 -144 -683 -50 -134 -108 -258 -173 -367 l-51 -88 -452 0 -451 0 33 138 c62 255 124 678 124 850 0 37 3 97 7 135 l6 67 553 0 553 0 -5 -52z m-3428 -1355 c113 -310 264 -576 420 -742 42 -44 72 -81 68 -81 -22 0 -193 52 -277 84 -387 146 -734 391 -993 701 -28 33 -54 66 -58 73 -6 9 79 12 408 12 l414 0 18 -47z m954 -418 c0 -256 -1 -465 -3 -465 -2 0 -28 7 -58 16 -249 73 -511 382 -678 802 -23 56 -41 105 -41 107 0 3 176 5 390 5 l390 0 0 -465z m960 460 c0 -2 -18 -51 -41 -107 -167 -420 -429 -729 -678 -802 -30 -9 -56 -16 -58 -16 -2 0 -3 209 -3 465 l0 465 390 0 c215 0 390 -2 390 -5z m1014 -7 c-4 -7 -30 -40 -58 -73 -259 -310 -606 -555 -993 -701 -84 -32 -255 -84 -277 -84 -4 0 26 37 68 81 156 166 307 432 420 742 l18 47 414 0 c329 0 414 -3 408 -12z" stroke="currentColor" strokeWidth="10" />
      </g>
    </svg>
  );

const GithubIcon = () => (
<svg fill="currentColor" stroke="currentColor" className="icon" viewBox="0 0 97.707 97.707">
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0112.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
    />
</svg>
);

const LinkedinIcon = () => (
<svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="icon" viewBox="0 0 24 24">
    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" stroke="none" />
</svg>
);

export default Footer