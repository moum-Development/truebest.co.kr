$(document).ready(function() {
    $.ajax({
        url: 'https://daemyungsangjo.kr/ip.php', // HTTP 프로토콜 사용
        type: 'GET',
        dataType: 'text',
        success: function(response) {
            try {
                var jsonData = JSON.parse(response);
                $('.ips').val(jsonData.ip);
            } catch (error) {
                console.error('JSON 파싱 중 오류 발생:', error);
            }
        },
        error: function(xhr, status, error) {
            console.error('API 호출 중 오류 발생:', status, error);
        }
    });
});

$(document).on('click','.eveSubmitBtn', function (e) {
	e.preventDefault();
	e.stopPropagation();

	var $form = $(this.form);

	if ($form.find('[name="name"]').val() == "") {
		alert("이름을 입력하세요");
		return false;
	}
	if ($form.find('[name="tel"]').val() == "") {
		alert("연락처를 입력하세요");
		return false
	}
	var phone1 = $form.find('[name="tel1"]').val();
	var phone = $form.find('[name="tel"]').val();
	if(phone1){
		phone = phone1+phone;
	}

	var formattedPhone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

	$form.find('[name="phone"]').val(formattedPhone);

	if ($form.find('[name="policy"]').is(":checked") == false) {
		alert("개인정보처리방침을 동의해야 합니다.");
		return false	
	}

	$.ajax({
		type: 'post',
		url: 'https://moum-on.co.kr/inst_in/inst_in_truebest_co_kr_oneWay.asp',
		data: $form.serialize(),
		dataType: 'html',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8', 
		success: function (e) {
			var chk = e;
			if (chk == "상담신청완료") {
				location.href = '/done.html';
				return false;
			} else if (chk == "중복접수") {
				alert("중복접수");				
				return false;
			} else {
				alert("접수실패");
				return false;
			}
		},
		error: function(response) {
			if (response.responseJSON.message) {
				alert(response.responseJSON.message);
			}
			if (response.responseJSON.inputName) {
				$form.find('[name="' + response.responseJSON.inputName + '"]').focus();
			}
		},
	});
});
function ajaxSend(ths) {
	var $form = ths;
	$.ajax({
		type: 'post',
		url: 'https://addonapi.uu-o.com/api/store',
		data: $form.serialize(),
		dataType: 'json',
		success: function (response) {
			console.log(response);
			location.href = '/done.html';
		},
		error: function (response) {
			if (response.responseJSON.message) {
				alert(response.responseJSON.message);
			}
			if (response.responseJSON.inputName) {
				$form.find('[name="' + response.responseJSON.inputName + '"]').focus();
			}
		},
	});
}

$(".numberOnly").on("keyup", function() {
	$(this).val($(this).val().replace(/[^0-9]/g,""));
});
function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }
}
