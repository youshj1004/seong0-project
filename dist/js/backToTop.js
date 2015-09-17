//  footer 위에 top으로 smooth하게 올라가게 하는 기능 구현
$(function () {
    /*
     * Back-toTop button (Smooth scroll)
     */
        // var height = $(document).scrollTop();
        // console.log(height);
        

        $('.back-to-top').on('click', function () {

            // Smooth Scroll 플러그인을 실행
            $.smoothScroll({
                easing: 'easeOutExpo', // 이징의 종류
                speed: 500             // 소요 시간
            });
        });
});