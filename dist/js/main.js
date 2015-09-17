
// scroll을 밑으로 내리면 nav를 복제해서 다른 css로 고정시키는 기능
$(function () {

    $('.navbar').each(function () {

        var $window               = $(window), // 창을 jQuery 오브젝트 화
            $header               = $(this),   // 헤더를 jQuery 객체 화
            $headerCloneContainer = $('<div class="page-header-clone"></div>'),  // 헤더 복제 컨테이너
            $headerClone          = $header.contents().clone(), // 헤더의 복제
            headerOffsetTop       = $header.offset().top, // 헤더의 기본 위치를 검색
            threshold             = $header.offset().top + $header.outerHeight();

           

            // 컨테이너 헤더의 복제를 삽입
            $headerCloneContainer.append($headerClone);

            // 컨테이너를 body의 마지막에 삽입
            $headerCloneContainer.appendTo('body');

        // 스크롤이 필요없을만큼 짧을때 hidden 클래스를 붙임
        if( $window.scrollTop() === 0 ){
                $('.back-to-top').addClass('hidden');
        }
        // 창이 스크롤 할 마다 작업을 수행 
        $window.on('scroll', function () {
            if( !($window.scrollTop() === 0) ){
                $('.back-to-top').removeClass('hidden');
            } 
            // 윈도우의 스크롤 량을 확인하고,
            // 헤더의 기본 위치를 지나서 있으면 클래스를 부여,
            // 그렇지 않으면 삭제
            if ($window.scrollTop() > threshold) {
                // $header.addClass('sticky');
                $headerCloneContainer.addClass('visible');
            } else {
                // $header.removeClass('sticky');
                $headerCloneContainer.removeClass('visible');
            }
            
        });

        // 윈도우의 스크롤 이벤트를 발생시키는
        // (헤더의 초기 위치를 조정하기 위해)
        // $window.trigger('scroll');

    });
});


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



$(function () {
    /*
     * Slideshow
     */
    $('.slideshow').each(function () {

    // 변수의 준비
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        var $container  = $(this),                                // a
            $slideGroup = $container.find('.slideshow-slides'),   // b
            $slides     = $slideGroup.find('.slide'),             // c
            $nav        = $container.find('.slideshow-nav'),      // d
            $indicator  = $container.find('.slideshow-indicator'),// e
            $autoBtn    = $('#auto-slide-btn'),
            $stopBtn    = $('#stop-slide-btn'),
            // 슬라이드 쇼의 각 요소의 jQuery 객체
            // a 슬라이드 쇼 전체 컨테이너
            // b 모든 슬라이드의 정리 (슬라이드 그룹)
            // c 각 슬라이드
            // d 네비게이션 (Prev/Next)
            // e 인디게이터 

            slideCount    = $slides.length,  // 슬라이드 점수
            indicatorHTML = '',              // 인디게이터 콘텐트
            currentIndex  = 0,               // 현재 슬라이드의 인덱스
            duration      = 500,             // 다음 슬라이드에 애니메이션의 소요 시간
            easing        = 'easeInOutExpo', // 다음 슬라이드에 애니메이션의 여유 종류
            interval      = 4000,            // 자동으로 다음 슬라이드로 옮길 때까지의 시간
            timer;                           // 타이머


    // HTML 요소의 배치 생성 삽입
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // 각 슬라이드의 위치를 결정하고,
        // 해당 표시기의 앵커를 생성
        $slides.each(function (i) {
            $(this).css({ left: 100 * i + '%' });
            indicatorHTML += '<a href="#">' + (i + 1) + '</a>';
        });

        // 인디게이터에 컨텐츠를 삽입
        $indicator.html(indicatorHTML);


    // 함수의 정의
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // 모든 슬라이드를 표시하는 함수
        function goToSlide (index) {
            // 슬라이드 그룹을 대상 위치에 맞게 이동
            $slideGroup.animate({ left: - 100 * index + '%' }, duration, easing);
            // 현재 슬라이드의 인덱스를 덮어쓰기
            currentIndex = index;
            // 탐색 및 표시 상태를 업데이트
            updateNav();
        }

        // 슬라이드의 상태에 따라 탐색 및 표시를 업데이트하는 함수
        function updateNav () {
            var $navPrev = $nav.find('.prev'), // Prev (뒤로) 링크
                $navNext = $nav.find('.next'); // Next (앞으로) 링크
            // 만약 첫 번째 슬라이드이라면 Prev 탐색을 해제
            if (currentIndex === 0) {
                $navPrev.addClass('disabled');
            } else {
                $navPrev.removeClass('disabled');
            }
            // 만약 마지막 슬라이드이라면 Next 탐색을 해제
            if (currentIndex === slideCount - 1) {
                $navNext.addClass('disabled');
            } else {
                $navNext.removeClass('disabled');
            }
            // 현재 슬라이드의 표시를 해제
            $indicator.find('a').removeClass('active')
                .eq(currentIndex).addClass('active');
        }

        // 타이머를 시작하는 함수
        function startTimer () {
            // 변수 interval에서 설정 한 시간이 경과 할 때마다 작업을 수행
            timer = setInterval(function () {
                // 현재 슬라이드의 인덱스에 따라 다음 표시 할 슬라이드의 결정
                // 만약 마지막 슬라이드이라면 첫 번째 슬라이드에
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        // 타이머를 중지있는 함수
        function stopTimer () {
            clearInterval(timer);
        }


    // 인벤토리 등록
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // 네비게이션 링크를 클릭하면 해당 슬라이드를 표시
        $nav.on('click', 'a', function (event) {
            event.preventDefault();
            if ($(this).hasClass('prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        });

        // 인디게이터의 링크를 클릭하면 해당 슬라이드를 표시
        $indicator.on('click', 'a', function (event) {
            event.preventDefault();
            if (!$(this).hasClass('active')) {
                goToSlide($(this).index());
            }
        });


    // 슬라이드 쇼 시작
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // 첫 번째 슬라이드를 표시
        goToSlide(currentIndex);

        // 타이머를 시작
        startTimer();

        // 슬라이드 컨트롤러 등록
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        $autoBtn.on('click', function(event){
            event.preventDefault();
            if($stopBtn.hasClass('active')){
                $stopBtn.removeClass('active');
            }
            $autoBtn.addClass('active');
            startTimer();
        });

        $stopBtn.on('click', function(event){
            event.preventDefault();
            if($autoBtn.hasClass('active')){
                $autoBtn.removeClass('active');
            }
            $stopBtn.addClass('active');
            stopTimer();
        })
        });
});


// 클릭이 이미지 애니메이션 등록
$(function(){
    // 
    // images ----------------------------------------
    var $topicList = $('.topics-list li');

    $topicList.on('mouseover', function(){
           $(this).find('.info_date')
                  .css({
                    'position' : 'absolute',
                    'bottom' : 0,
                    'left' : 0,
                    'display' : 'block',
                    'background' : '#E7E7E7',
                    'opacity' : 0.6,
                    'color' : 'black',
                    'border-radius' : '0 0 20px 20px'
                  });
        })
        .on('mouseout', function(){
           $(this).find('.info_date').css('display', 'none');
        });
});



// bottom banner
$(function () {

    /*
     * Tabs
     */
    $('.work-section').each(function () {

        var $container = $(this),                            // a
            $navItems = $container.find('.tabs-nav li'),     // b
            $highlight = $container.find('.tabs-highlight'); // c
        // 탭의 각 요소를 jQuery 객체 화
        // a 탭과 패널을 포함한 전체 컨테이너
        // b 탭의 목록
        // c 선택한 탭의 하이라이트

        // jQuery UI Tabs를 실행
        $container.tabs({

            // 숨길 때의 애니메이션
            hide: { duration: 250 },

            // 표시 할 때 애니메이션
            show: { duration: 125 },

            // 로드시와 탭 선택시에 하이라이트의 위치를 조정
            create: moveHighlight,
            activate: moveHighlight
        });

        // 하이라이트의 위치를 조정하는 함수
        function moveHighlight (event, ui) {
            var $newTab = ui.newTab || ui.tab,  // 새로 선택된 탭의 jQuery 객체
                left = $newTab.position().left; // 새로 선택된 탭의 왼쪽 위치

            // 하이라이트의 위치를 애니메이션
            $highlight.animate({ left: left }, 500, 'easeOutExpo');
        }
    });

});
