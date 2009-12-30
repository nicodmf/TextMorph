---
title: Migration de Wordpress vers Jekyll
wordpress_url: http://people.happycoders.org/dax/2009/11/09/migration-wordpress-jekyll
layout: post
tags: [wordpress, jekyll, ruby, web, blog]
categories: [geek, blog]
author: David
---
Les rares abonn吾西务吾熙西s au flux RSS de mon blog l'auront remarqu吾西务吾熙西, je ne
poste pas vraiment r吾西务吾熙西guli吾西务╮ement (j'esp吾西务╮e m'am吾西务吾熙西liorer, j'ai plein de
sujets de geek 吾西务  partager :) ). En fait, jusqu'吾西务  maintenant, je
passais plus de temps 吾西务  mettre 吾西务  jour
[Wordpress](http://www.wordpress.org) pour 吾西务吾熙西viter d'吾西务吾矽屋tre 吾西务 
la traine niveau correction de failles de s吾西务吾熙西cu. Si seulement c'吾西务吾熙西tait
juste Wordpress, les plugins que j'utilisais devaient eux aussi subir
une mise 吾西务  jour pour suivre l'吾西务吾熙西volution des APIs de Wordpress. Et tout
ne se passait pas toujours tr吾西务╯ bien :(.

Comme je suis dans ma p吾西务吾熙西riode "revenons aux sources, pourquoi ai-je
besoin de m'encombrer avec ce #$%@!!. de XXX ?" (remplacer XXX par
Wordpress, Eclipse, OpenOffice ou tout autre soft qui finit
immanquablement en usine 吾西务  gaz), et que je suis un peu un geek sur les
bords, je me suis dis que j'allais essayer
[Jekyll](http://github.com/mojombo/jekyll).

Qu'est ce que Jekyll ?
----------------------
C'est un petit outil 吾西务吾熙西crit en Ruby qui 吾西务  partir
de templates [Liquid](http://www.liquidmarkup.org/) et de fichiers
[Markdown](http://daringfireball.net/projects/markdown/syntax) (吾西务
ressemble 吾西务  une syntaxe de Wiki : voyez le
[source de ce post](/dax/source/2009-11-09-migration-wordpress-jekyll.markdown))
g吾西务吾熙西n吾西务╮e un blog en statique que je d吾西务吾熙西pose ensuite derri吾西务╮e un Apache.

Par o吾西务吾锡务 commencer ?
------------------
Je n'ai toutefois pas fait table rase, j'ai repris l'existant de mon
Wordpress en commen吾西务nt par migrer le syst吾西务╩e de commentaire sur le
service [Disqus](http://disqus.com) 吾西务  l'aide du
[plugin Wordpress qui va bien](http://wordpress.org/extend/plugins/disqus-comment-system/).
Oui, un site avec des pages HTML en
statique va avoir du mal 吾西务  conserver les commentaires des
posts! Je d吾西务吾熙西l吾西务╣ue donc, tout en me permettant une migration des
commentaires tout en douceur :

* Le plugin Disqus pour Wordpress a une fonction de migration,
* Le nouveau site inclus ensuite Disqus avec les quelques lignes de
  Javascript qui vont bien.

  Ensuite, un
  [petit script](http://github.com/mojombo/jekyll/blob/master/lib/jekyll/converters/wordpress.rb)
  permet d'extraire les posts de la base de
  donn吾西务吾熙西es Wordpress pour les transformer en fichier Markdown. Le
  r吾西务吾熙西sultat n'est pas parfait, mais 吾西务 permet de d吾西务吾熙西buter.

  Le templating
  -------------
  Une fois les posts migr吾西务吾熙西s, il reste encore 吾西务  吾西务吾熙西crire les templates dans
  lesquels les articles (et autres pages) s'ins吾西务╮eront.

  Rien de magique, du HTML, du CSS, une pinc吾西务吾熙西e de Javascript et un peu
  de [Liquid](http://www.liquidmarkup.org/) pour faire quelques boucles,
  quelques conditions :

  {% highlight html %}
  <div id="recent_posts" class="sidebar_section">
    <h4 class="sidebar_title">Recent posts</h4>
      <div class="sidebar_content">
          <ul>
	  	{% for post in site.posts limit:5 %}
			<li><a href="{{ post.url  }}">
			          {{ post.title }}
				  	</a></li>
						{% endfor %}
						    </ul>
						      </div>
						      </div>
						      {% endhighlight %}

						      Et donc ?
						      ---------
						      Oui, et donc ? Et bien je dirais que je me suis bien fait plaisir ;),
						      j'ai pass吾西务吾熙西 un peu plus de temps que pr吾西务吾熙西vu quand m吾西务吾矽屋me vu le niveau
						      HTML+CSS que j'avais.

						      Le blog est versionn吾西务吾熙西 dans un [repo Git](/dax/projects/blog.git), donc
						      plus de probl吾西务╩e de backup de base MySQL, de migration, de restauration
						      approximative, un ``git clone`` suivi de ``rake`` suffit (j'utilise
						      [Rake](http://)
						       pour g吾西务吾熙西n吾西务吾熙西rer quelques pages suppl吾西务吾熙西mentaires, et lancer la g吾西务吾熙西n吾西务吾熙西ration
						        du site par Jekyll).

