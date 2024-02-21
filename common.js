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
	$form.find('[name="phone"]').val(phone);

	if ($form.find('[name="policy"]').is(":checked") == false) {
		alert("개인정보처리방침을 동의해야 합니다.");
		return false	
	}

$.ajax({
    type: 'get',
    url: 'https://daemyungsangjo.kr/ip.php',
    dataType: 'text',
    success: function (response) {
	$form.find('[name="ips"]').val(response);
	alert(response);
        console.log(response);
    },
    error: function (error) {
	    alert('test');
        console.error("Error:", error);
    }
});


	
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

function phoneCall(phoneNumber) {
	location.href = "tel:" + num;
}

phoneCall("01030150958");

function preventClick(e){
	e.preventDefault()
}
