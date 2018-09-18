<?php
define('ONLY_HOST', 'vladdin.cn');

if(ONLY_HOST && $_SERVER['HTTP_HOST'] != ONLY_HOST) {
    $uri = $_SERVER['REQUEST_URI'];
    $scheme = $_SERVER['REQUEST_SCHEME'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: '.$scheme.'://' . ONLY_HOST .$uri);
    exit;
}

?>

<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9" lang="en-US"> <![endif]-->
<!--[if gt IE 8]>
<!-->
<html class="no-js" lang="en-US"><!--<![endif]-->
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<header>
<div><div class="headFix">
<img src="images/vladdins_03.png" class="leftImage floatLeft">
<nav>
<ul>
<a href="#design"><li>DESIGN</li></a>
<a href="#addImageo"><li>SPECIFICATION</li></a>
<a href="#addBackg"><li>FEATURE</li></a>
<a href="#review"><li>TESTIMONIAL</li></a>
<a href="#addImaget"><li>TEAM</li></a>
<a href="#joinus"><li>JOIN US</li></a>
</ul>
</nav>
</div></div>
<div class="clearboth"></div>

<div class="headFix headTitle">
<img src="images/vladdins_08.png" class="midImages">
<h1>CLOSED POD VAPING SYSTEM</h1>
</div>
</header>

<div class="clearboth"></div>
<article id="design">
<div class="headFix">
<div class="conWid3 floatLeft">
<h2>DESIGN</h2>
</div>
<div class="conWid7 floatRight">
<h3>Ergonomic Design</h3>
<p>While ensuring the convenience to use, the Vladdin also improves the durability and insulation performance. <br />Meanwhile, it adopts the magnet technique on the tank bottom of Vladdin, achieving improvement in spill proof function. </p>
<h3>Atomization Technique</h3>
<p>Vladdin with closed loop system has been strengthened the atomization technique to make the  particles smaller and easier to absorb the nicotine, leading a more like smoke taste. </p>
</div>
</div>
</article>
<div class="clearboth"></div>
<article id="addImaged"><img src="images/vladdin_08.jpg"></article>
<div class="clearboth"></div>
<article id="addImageo">
<div class="headFix">
<h2>SPECIFICATION</h2>
<h3>Vladdin Pod</h3>
<p>Weight: about 5g <br/>Cartridge Capacity: 1.5ml <br/>Resistance Range: 1.2~1.5ohm</p>
<h3>Vladdin Battery</h3>
<p>Output Voltage: 3.5V <br/>Charging Current: 0.2~0.4V <br/>Charging Time: 1~2 Hours <br/>Weight: about 13g <br/>Whole Size: 19.04mmL * 11.4mmW * 90.32mmH <br/>Maximum Output Wattage: 12W</p>
</div>
</article>
<div class="clearboth"></div>
<article id="addBackg">
<div class="headFix">
<div class="conWid5 floatLeft">
<h2>FEATURE</h2>
<ul class="feaListone">
<li>Portable and easy to use closed pod vaping system</li>
<li>Consistent and efficient delivery by control power</li>
<li>Magnetic connection between pod and battery</li>
<li>Universal Micro-USB charger</li>
<li>Ceramic Coil Inside</li>
</ul>
<h3>Package Included</h3>
<ul class="feaListwo">
<li>1 x VLADDIN device</li>
<li>1 x VLADDIN cartridge</li>
<li>1 x USB cable</li>
<li>1 x User manual</li>
</ul>
</div>
<div class="conWid5 floatRight">
<a href = "javascript:void(0)" onclick = "document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'"><img src="images/vladdin_12.jpg"></a> 
<a href = "javascript:void(0)" onclick = "document.getElementById('lighto').style.display='block';document.getElementById('fade').style.display='block'"><img src="images/vladdin_14.jpg"></a>
<a href = "javascript:void(0)" onclick = "document.getElementById('lightt').style.display='block';document.getElementById('fade').style.display='block'"><img src="images/vladdin_18.jpg"></a>
<a href = "javascript:void(0)" onclick = "document.getElementById('lightf').style.display='block';document.getElementById('fade').style.display='block'"><img src="images/vladdin_19.jpg"></a>
<div id="light" class="white_content"><a href = "javascript:void(0)" onclick = "document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'"><img src="images/closebutton.png"></a></div>
<div id="lighto" class="white_contento"><a href = "javascript:void(0)" onclick = "document.getElementById('lighto').style.display='none';document.getElementById('fade').style.display='none'"><img src="images/closebutton.png"></a></div>
<div id="lightt" class="white_contentt"><a href = "javascript:void(0)" onclick = "document.getElementById('lightt').style.display='none';document.getElementById('fade').style.display='none'"><img src="images/closebutton.png"></a></div>
<div id="lightf" class="white_contentf"><a href = "javascript:void(0)" onclick = "document.getElementById('lightf').style.display='none';document.getElementById('fade').style.display='none'"><img src="images/closebutton.png"></a></div>
<div id="fade" class="black_overlay"></div>
</div>
</div>
</article>
<div class="clearboth"></div>
<article id="review">
<div class="headFix">
<h2>TESTIMONIAL</h2>
<ul>
<li>This product is so cool, and I can carry it around. Great!! </li>
<li>Love this product, it's easy to use. The product lasts almost a week for me-I do not smoke a lot. It lasts about 2 and a half days. Great shipping!! </li>
<li>Thankfully this little guy has saved me on more than one occasion when I need to vape on the go. </li>
</ul>
</div>
</article>
<div class="clearboth"></div>
<article id="addImaget">
<div class="headFix">
<h2>TEAM</h2>
<p>At Vladdin, we believe the true value of product lies in the customers we offer, highly-quality e-cigarettes we produce and convenience we bring to our customers. That’s why we focus our resources on two key areas: Customer Service and High-Quality Product. </p>
<p>In ensuring our products and customer services safe and accessible, we are proud to work with our skilled and professional teams. We continue to release a wide range of high-quality products with our skilled and dedicated team, ensuring our customers have a comfortable and exciting experience. Our Vladdin is your trustworthy friend. </p>
</div>
</article>
<div class="clearboth"></div>
<footer id="joinus">
<div class="headFix">
<h2>JOIN US</h2>
<p>We are always on the lookout for new agents and distributors for Vladdin products. If you are interested in selling our products and you believe we could be the right partner for your business. Please contact us via Email: <a href="mailto:vape.vladdin@gmail.com">vape.vladdin@gmail.com</a></p>
</div>
</footer>
<div class="goTop"><a href="#"><img src="images/top.png"></a></div>
</body>
</html>
