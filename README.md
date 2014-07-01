LELE
====

独乐乐不如众乐乐


<h2>directly（蒙灰提示插件）</h2>

<p>if the first time you login one site , the site will show the new or interesting function to you.</p>
<p>The plugin has the function to show some help or tips to one who first login your site or who click the help button.</p>

<h2>Example</h2>
<hr/>
<pre>
<code>
$(document).ready(function() {
	$(".helper").directiveTips({
		tip: [
		 {"name": ".left-top", "details": "这是一首小情歌！"},
		 {"name": ".right-top", "details": "这是一首小情歌！"},
		 {"name": ".left-bottom", "details": "这是一首小情歌！"},
		 {"name": ".right-bottom", "details": "这是一首小情歌！"},
		 {"name": ".center", "details": "这是一首小情歌！"}]
	});
});
</code>
</pre>

<h2>How it works</h2>
<hr/>
<p></p>
