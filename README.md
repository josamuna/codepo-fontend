[![](https://user-images.githubusercontent.com/46261770/79870277-9a490b00-8397-11ea-88ac-e8dc25124084.png)](https://monitor-engine.com)

# Monitor Engine

> MonitorEngine est un système de monitoring d’équipement de télécommunication pour un déploiement rapide et flexible d’équipes mobiles en situation d’urgence ou de coopération assurant le contrôle du niveau de la batterie et la localisation des malletes mobiles (A distance) de **MSF** (Medécin Sans Frontière) **Belgique**.

## Table des Matières

1. [Introduction](#Introduction)
2. [Structure](#Structure)
3. [Fonctionnement](#Fonctionnement)
4. [Technologies](#Technologies)
5. [Installation](#Installation)
6. [Versionning du logiciel](#VersionningDuLogiciel)
7. [Sponsors](#Sponsors)
8. [Contributeurs](#Contributeurs)
9. [Licence](#Licence)

### Introduction

***

Les modules mobiles sont equipés des dispositifs électroniques capables d'envoyer des données (Au format JSON) à une plateforme de visualisation (Application web [monitor-engine](https://monitor-engine.com)) par l'intermédiaire d'une plateforme de transit [thingstream](https://thingstream.io) qui nous sert de source des donnees à traiter.

Les données envoyées sont formatés de sorte à renvoyer **la localisation** (*Latitude* et *logitude* du module mobile : Moyennant l'API de [LeafLet](https://leafletjs.com)) ainsi que **le niveau de la tension de la batterie (*En pourcentage*)**. En outre, il sera possible d'envoyer certaines commandes à un module mobile spécifique via la plateforme web; pour modifier son fonctionnement (Comme *changer l'interval de temps entre deux mesures* ou *désactiver le module*).

### Structure

***

Le projet est constitué en deux grandes dont le  [Frontend](https://github.com/josamuna/codepo-fontend) et le [Backend](https://github.com/josamuna/codepo-backend), avec chacunes ses spécificitées. En outre, les deux parties sont intiméments liées car l'un ne peut pas fonctionner sans l'autre :

- **Client web** ([Frontend](https://github.com/josamuna/codepo-fontend)) : C'est la partie servant d'intermédiaire entre l'utilisateur et les mallettes mobiles (**C'est l'interface graphique de l'utilsateur**). Cela implique la gestion des utilisateurs, le suivi des différentes périphériques par la visualisation des certaines informations les concernants (*Niveau de la tension de la batterie*, *longitude et latitude* et *etats dfe fonctionnement*) ainsi que l'envoie des requêttes vers les équipements distants (Par l(intermédiare de thingstream).
- **Gestionnaire des interactions de l'utilisateur et traitement** ou **partie Serveur** ([Backend](https://github.com/josamuna/codepo-backend)) : Contrôle toutes les intéractions entre les utilisateurs de la plateforme mobile et les dispositifs mobiles, et vice-versa.
  * **Base de Données *MYSQL*** : Assure le traçage des informations échangées avec les périphériques mobiles tout en facilitant un stockage à long terme. C'est ainsi, qu'elle permet de vérifier l'historique des mésures effectuées au cours du temps.
  * **Scheduleur** : Gère en arrière plan l'envoie des requêtes vers le dispositif mobile pour mettre à jour l'interface utilisateur avec les informations utiles à ce dernier.

> [Django](https://www.djangoproject.com/) (Pour le Backend) et [ReactJs](https://fr.reactjs.org/) (Pour le Frontend) ont été choisi du fait qu’ils offrent :

- Un modèle standard et intéractif pour le développement web rapide.
- Une sécurité de haut niveau intégré.
- Facilité d'affichage des coordonnées géographiques sur une Map avec [Leafllet](https://leafletjs.com/).
- Bonne intégration du Design Pattern **MVC** (**M**odèle, **V**ue et **C**ontrolleur) pour **ReactJs**:
  * ***La couche Modèle*** : Est la partie chargée de stocker les données qui devront être manipulées par l'utilisateur. En outre, elle est le pont avec la Base de Données.
  * ***La couche Vue*** : Est la partie qui s’occupe de la présentation des données aux utilisateurs : C'est l'interface utilisateur disponible par l'utilisation de l'application. Elle est responsable de la mise en forme de l'aspect visuel de l’application (Pour notre cas, elle a été constituée particulièrement des pages web utilisant du code ***HTML***, ***CSS*** et ***JavaScript***).
  * ***La couche Controlleur*** : Et la partie centrale permettant d'aiguiller les données captées par les imputs de l'utilisateur au travers l'interface graphique et de les stocker après traitements et validation (Interface Graphique / UI et Validateur ou Validateur et UI). Elle se charge aussi de diriger les informations tout en décidant de la partie qui va la récupérée et la traitée. Elle gère ainsi les requêtes des utilisateurs en vue de retourner la réponse appropriée au destinateur en faisant appel aux couches ***Modèle*** et ***Vue***.
- Possibilité du'utilisation du Design Pattern ***M***odèle, ***V***ue et ***T***emplate (Inspiré du Modèle Vue Controlleur) pour ***Django*** qui et facilite l’organisation de l'application tout en assurant un meilleur découpage en couches distinctes (Segments ou parties du code qui peuvent être développés séparement, et cela par des équipes différentes):
  * Django permet l'utilisation des ***API REST*** (***A***pplication ***P***rogramming ***I***nterface ***RE***presentational ***S***tate ***T***ransfert) grâce à [Django Rest Framework](https://www.django-rest-framework.org/) et interagit avec une Base de Données ***MYSQL*** par l'utilisation du ***Modèle de Django***, enfin après ***React Client*** permet l'envoie des requête HTTP grâce à l'utilitaire [axios](https://www.npmjs.com/package/react-axios), affiche des données sur les composants.

Bref, la conjonsction des deux technologies a permet un développement rapide des applications professionnelles tout en disposant d'un environnement d’exécution facilement intégrable avec divers *API*.

### Fonctionnement

***

Les étapes du fonctionnement de la plateforme web avec le module électronique est décris comme suit:
1. Envoi temporaire de la requête http de la plateforme web vers ThingStream de demande des informations (longitude, latitude, niveau de la tension de la batterie, intervalle de mesure, et état de la batterie) de la batterie.
2. Récupération de la réponse (en JSON pour ***J***avaScript ***O**bject* ***N***otation) de Thingstream par rapport à la requête.
3. Transfert de la réponse de Thingstream à la couche Metier.
4. Mise en forme des informations de la réponse pour un probable stockage.
5. Sauvegarde des informations dans la Base de Données pour une bonne historisation.
6. Réponse du serveur de Base de Données par rapport au stockage des informations effectuées.
7. Transfert des informations de la réponse de Thingstream aux Controleurs.
8. Transfert des informations de la réponse de Thingstream au Modèle par le contrôleur.
9. Transfert des informations de la réponse de Thingstream aux vues par le Modèle.
10. Transfert des informations de la réponse de Thingstream dans aux pages web par les Vues pour leurs l’affichage dans l’interface utilisateur.
11. Requête des utilisateurs au système par rapport soit à l’arrêt de la batterie ou lancement d'une commande quelconque au module électronique selon les besoins.
12. Transfert de la requête de l’utilisateur au Processus de réception par le contrôleur.
13. Transfert de la requête de l’utilisateur au site distant Thingstream par le Processus de réception.

<p align="center">
  <img width="700" height="400" src="https://user-images.githubusercontent.com/46261770/79869763-b8623b80-8396-11ea-8ee8-6e8b4b3c0857.png">
</p>

### Technologies

***
La liste des technologies utilisées dans ce projet se présente comme suit:

- **Côté Backend** :
  * [Python](https://www.python.org/downloads/): Version **3.9.4** ou supérieur.
  * [Django](https://docs.djangoproject.com/en/3.2/topics/install/#installing-official-release): **3.2.11** ou **Lastest**.
- **Côté Frontend** :
  * [Nodejs](https://nodejs.org/en/download/): Version **12.20** et après **16.13.1**.
  * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): Version **6.14.10** et après **8.1.2**.
  * [Leaflet](http://react-leaflet.js.org): **Toutes les versions** sont acceptables.
- **Pour Thingstream**: [Thingstream](https://developer.thingstream.io/guides/thingstream-management-console): **Toutes les informations** sont acceptables.

### Installation

***

#### Pour le Backend

***

Dans le processus de developpment des deux parties du logiciel, **Windows** a été la plateforme de travail. Ainsi ce qui précède a un penchant pour Windows. Aussi, avant de devoir utilisé ***Django***, l'installation de ***Python*** est requise.

##### Installation de Python

> ````Télécharger ````[python](https://www.python.org/downloads/) ````sur son site officiel suivant le type de Système d'Exploitation utilisé (Windows, Linux ou Mac). Puis l'installer.````

##### Installation de Django:

> **Installation de l'environnement virtuel** (Non nécessaire en cas d'utilisation de l'IDE PyCharm qui le ferai à notre place) :

```
..\> py -m venv project-name
...\> project-name\Scripts\activate.bat
```

> **Installation proprement dite de Django** (L'installation de ***pip*** pourrait être requise et cela n'est pas nécessaire avec PyCharm car il gère correctement les dépendances, il suffirait juste de l'ajouter dans le gestionnaire des dépendances) :
```
...\> py -m pip install Django
```

> **Creation du projet Django**

`1`. [OSX et Linux](https://tutorial.djangogirls.org/fr/django_start_project/):

```
(myvenv) ~/djangoproject$ django-admin startproject mysite
```

`2`. [Windows](https://docs.djangoproject.com/fr/3.1/intro/tutorial01/):

```
...\> django-admin startproject mysite
```

#### Pour le Frontend

***

> **Installation des paquets de ReactJs**:

`1`. [OSX or Linux](https://programmingfields.com/how-to-install-react-in-windows-and-linux-step-by-step/):
- **Mise à jour des paquets**:

    ```
    sudo apt-get update
    ```
  OU
    ```
    sudo apt update
    ```

- **Paquets du nodesource**:
    ```
    cd ~
    curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
    ```

- **Exécution du script (run-download-script)**:
    ```
    sudo bash nodesource_setup.sh
    ```
- **Installation de NodeJS**:
    ```
    sudo apt-get install nodejs -y
    ```
  OU
    ```
    sudo apt install nodejs -y
    ```
- **creation de l'application react avec npm**:
    ```
    npm install -g create-react-app
    ```

- **creation d'un nouveau projet react**:
    ```
    create-react-app hello-react
    ```

`1`. [Windows](https://programmingfields.com/how-to-install-react-in-windows-and-linux-step-by-step/):

- **Installation de NodeJS**:

  ```Télécharger ``` [NodeJS](https://nodejs.org/en/) via son site officiel.
  ```L'installer en suivant les instructions lors de l'installtion (Internet requise).```

- **Installation du create-react-app Tools**:
    ```
    npm install -g create-react-app
    ```
- **Creating du nouveau projet ReactJS**:
    ```
    create-react-app test-project
    ```
- **Lancement de l'application react**:
    ```
    cd test-project
    npm start
    ```

- **Pour le paquet de leaflet après l'installation de ReactJS**: Valable pour Windows et Linux:
  - Consulter la documentation officielle dans [react-leaflet](https://react-leaflet.js.org/docs/start-introduction).
  - API de référence pour [leflet](https://react-leaflet.js.org/docs/api-map).

- Installation de Thingstream:
  - Consulter la documentation officiel de thingstream sur : [How to connect IoT devices to Cumulocity with u‑blox Thingstream](https://www.u-blox.com/en/blogs/insights/how-to-connect-iot-devices-cumulocity-thingstream).


### Versionning du logiciel

***

Le développement de l'application a commencé depuis ***Debut Janvier 2021*** et à chaque version, des modifications sont apportées à plusieurs aspects: de l'**interface utilisateur**, de son **ergonomie** ainsi que de ses *fonctionnaliés*: Pouvant impacter à la fois le Backend et le Frontend.
Avant tout, la plateforme est disponible via le lien : [Monitor-Engine](https://monitor-engine.com): https://monitor-engine.com.

##### Version 1.0 (Avec SpringBoot et Angular) : [Monitor Engine](https://github.com/isigcodepo/monitor-engine)

- Mise au points d'une interface de login avant d'accéder à l'application.
- Ajout des menus pour ***la gestion courante*** (`Device`, `Map`, `Users`,`Logs` et `Setings`) et leur gestion en terme d'ajout, modification et suppression.

##### Version 1.0 (refaite entièrement avec Django et ReactJS) : [Backend](https://github.com/Ld03-muss/codepo-fontend) et [Frontend](https://github.com/Moise-Nturubika/codepo-backend):
L'application a gardé presque les mêmes fonctionnalités (avec quelques amélioration), néanmoins toutes refaites sur base des nouvelles technologies.

- Mise en place d'une interface pour une **S**ingle **P**age **A**pplication`.
- Ajout des menus pour ***la gestion courante*** (`Dashboard`, `Device` `Map`, `Users`,`Logs` et `Setings`) concu sous Reactjs.
- Mise en place des tokens pour la gestion des utilisateurs.
- Affichage de la Map et possibilité du groupement des devices dans un seul marker.
- Souscription permanente sur le topic ou ***ecoute permanente du device***.
- Mise en place des interfaces modales pour l'enregistrement lors de la manipulation de l'interface graphique.

> ***La suite de cette documentation se trouve sur [ce repository](https://github.com/josamuna/codepo-backend) qui fourni bon nombre des détails technique concernant le projet.***

### Sponsors

1. En tant que sponsors prépondérant, l'[ULB (Université Libre de Bruxelles)-CODEPO (Cellule de Coopération au Développement de l'Ecole Polytechnique de Bruxelles)](https://polytech.ulb.be/fr/international/cellule-de-cooperation-au-developpement) au sein de la CODEPO assure la mise au point du module électronique.

[![ULB](https://user-images.githubusercontent.com/15903230/74433560-4c7cc780-4e69-11ea-8c20-62a458ae1ffb.png)](https://polytech.ulb.be/fr/international/cellule-de-cooperation-au-developpement)

2. Comme financier, l'[ARES(Académie de Recherche et d'Enseignement Supérieur)](https://www.ares-ac.be/fr/) finance bon nombre des activités du projet. ***Il est le bailleur de fond numéro 1***.

[![](https://user-images.githubusercontent.com/15903230/151866705-e34adcd8-ab46-4fe7-ae05-9525193d7fc9.png)](https://www.ares-ac.be/fr/)

4. Pour sa par prépondérante dans la collaboration, l'[ISIG (Institut Supérieur d'Informatique et de Gestion de Goma)](https://www.isig.ac.cd/) assure la mise en place de la plateforme logiciel devant communiquer avec le module électronique.

[![ISIG Goma](https://user-images.githubusercontent.com/15903230/74431114-f7d84d00-4e66-11ea-9b20-d3db26e0db89.png)](https://www.isig.ac.cd/)

### Contributeurs

***

Plusieurs personnes ont apporté leurs pierre dans la mise au point de ce logiciel pour la part de l'ISIG, nous rémercions:
- **Josué Isamuna Nkembo** : `+243972727527`, <josueisamuna@isig.ac.cd>, <https://github.com/josamuna/>
- **Joseph Kalema Shango** : `+243997831578`, <kalemajoseph39@gmail.com>, <https://github.com/berna39>
- **Celine Kavira Kataliko** : `+243975595616`, <kavirceline@gmail.com>
- **Lydie Kavira Musekwa** : `+243974346798`, <lydiemusekwa@gmail.com>, <https://github.com/Ld03-muss>
- **Chadrac Kighundila  Wakomya** : `+243979076416`, <chadracx@gmail.com>, <https://github.com/Chadrac-WAKOMYA>
- **Glodi Maley Musema** : `+243992992063`, <glodimaley@gmail.com>, <https://github.com/projetMaleyMusemaGlodi2>
- **Michel Osée** : `+32472305055`, <michel.osee@ulb.be>, <https://github.com/miosee>
- **Mugisho Vital Taka** : `+243973588406`, <vitaltakanic@gmail.com>
- **Nturubika Moise**: `+243975236270`, <nturumoussa@gmail.com>, <https://github.com/Moise-Nturubika>
- **Daniel Muya wa Mpongo** : `+243994814807`, <danielmpongo22@gmail.com>
- **Mwadjuma Atubu** : `+243976439932`, <mwadjumwadjuma@gmail.com>
- **Louange Nzanzu Lusenge** : `+243975592161`, <louangelusenge06@gmail.com>
- **Toussaint Bugandwa Ciza** : `+243970281252`, <toussaintbugandwa@isig.ac.cd>

### License

***

Ce projet est par ailleurs soumis aux droits relatifs à la licence [MIT](https://mit-license.org/).
