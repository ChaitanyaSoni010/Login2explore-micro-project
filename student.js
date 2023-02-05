
        $("#sId").focus();

        function validateAndGetFormData() {
            var sIdVar = $("#sId").val();
            if (sIdVar === "") {
                alert("Student Roll Required Value");
                $("#sId").focus();
                return "";
            }
            var sNameVar = $("#sName").val();
            if (sNameVar === "") {
                alert("Student Name is Required Value");
                $("#sName").focus();
                return "";
            }
            var sClassVar = $("#sClass").val();
            if (sClassVar === "") {
                alert("Class is Required Value");
                $("#sClass").focus();
                return "";
            }
            var DOBVar = $("#DOB").val();
            if (DOBVar === "") {
                alert("DOB is Required Value");
                $("#DOB").focus();
                return "";
            }
            var sAddressVar = $("#sAddress").val();
            if (sAddressVar === "") {
                alert("Address is Required Value");
                $("#sAddress").focus();
                return "";
            }
            var enrolVar = $("#enrol").val();
            if (enrolVar === "") {
                alert("Enrollment Date is Required Value");
                $("#enrol").focus();
                return "";
            }
            var jsonStrObj = {
                sId: sIdVar,
                sName: sNameVar,
                sClass: sClassVar,
                DOB: DOBVar,
                sAddress: sAddressVar,
                enrol: enrolVar,
            };
            return JSON.stringify(jsonStrObj);
        }
        // This method is used to create PUT Json request.
        function createPUTRequest(connToken, jsonObj, dbName, relName) {
            var putRequest = "{\n" +
                "\"token\" : \"" +
                connToken +
                "\"," +
                "\"dbName\": \"" +
                dbName +
                "\",\n" + "\"cmd\" : \"PUT\",\n" +
                "\"rel\" : \"" +
                relName + "\"," +
                "\"jsonStr\": \n" +
                jsonObj +
                "\n" +
                "}";
            return putRequest;
        }

        function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
            var url = dbBaseUrl + apiEndPointUrl;
            var jsonObj;
            $.post(url, reqString, function(result) {
                jsonObj = JSON.parse(result);
            }).fail(function(result) {
                var dataJsonObj = result.responseText;
                jsonObj = JSON.parse(dataJsonObj);
            });
            return jsonObj;
        }

        function resetStudent() {
            $("#sId").val("")
            $("#sName").val("");
            $("#sClass").val("");
            $("#DOB").val("")
            $("#sAddress").val("");
            $("#enrol").val("");
            $("#sId").focus();
        }

        function saveStudent() {
            var jsonStr = validateAndGetFormData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest("90932726|-31949276690122895|90954736",
                jsonStr, "STUDENT", "STUDENT-REL");
            alert(putReqStr);
            jQuery.ajaxSetup({
                async: false
            });
            var resultObj = executeCommand(putReqStr,
                "http://api.login2explore.com:5577", "/api/iml");
            alert(JSON.stringify(resultObj));
            jQuery.ajaxSetup({
                async: true
            });
            resetStudent();
        }

        function createUPDATERecordRequest(token, jsonObj, dbName, relName, reqId) {
            var req = "{\n" +
                "\"token\" : \"" +
                token +
                "\"," +
                "\"dbName\": \"" +
                dbName +
                "\",\n" + "\"cmd\" : \"UPDATE\",\n" +
                "\"rel\" : \"" +
                relName +
                "\",\n" +
                "\"jsonStr\":{ \"" +
                reqId +
                "\":\n" +
                jsonObj +
                "\n" +
                "}}";
            return req;
        }

        function updateStudent() {
            $("#update").prop("disabled", true);
            jsonChg = validateAndGetFormData();
            var updateRequest = createUPDATERecordRequest(connToken, jsonChg, dbName, relName, localStorage.getItem("sId"));
            jQuery.ajaxSetup({
                async: false
            });
            var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
            jQuery.ajaxSetup({
                async: true
            });
            console.log(resJsonObj);
            resetStudent();
            $("#sId").focus();
        }
    