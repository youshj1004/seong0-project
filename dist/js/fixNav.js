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