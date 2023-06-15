(function() {
            var message_ip;
            var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
            httpRequest.open('GET', 'https://api-cf.nn.ci/ip', true); //第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
            httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
            /**
             * 获取数据后的处理程序
             */
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                    var json = httpRequest.responseText; //获取到json字符串，还需解析
                    message_ip = JSON.parse(json);
                    console.log(message_ip);
                    geographyTextIP(message_ip);
                }
            };

            function geographyTextIP(message) {
                var geographyText = document.getElementById("geographyText");
                if (message.ip) {
                    geographyText.innerHTML += "<span> IP: " + message.ip + "</span>";
                }
                if (message.region) {
                    geographyText.innerHTML += "<span> Region: " + message.region + "</span>";
                }
                if (message.country) {
                    geographyText.innerHTML += "<span> Country: " + message.country + "</span>";
                }
                if (message.province) {
                    geographyText.innerHTML += "<span> Province: " + message.province + "</span>";
                }
                if (message.city) {
                    geographyText.innerHTML += "<span> City: " + message.city + "</span>";
                }
                if (message.isp) {
                    geographyText.innerHTML += "<span> ISP: " + message.isp + "</span>";
                }
            }
        })()
