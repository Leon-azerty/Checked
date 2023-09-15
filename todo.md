Ex todo apps:
https://zapier.com/blog/best-todo-list-apps/

Figma :
https://www.figma.com/file/YgsyWGXx98cCWqy7wFNUWB/Untitled?type=design&node-id=0-1&mode=design&t=zEgidPlRBo9PkHxC-0

Body :
- [x] loader tant qu'on a pas charger les todos

Card:
- [x] afficher l'état de la todo (finish/not finish) via l'icon
- [x] actualiser la page quand on delete un todo
- [x] ajouter l'étoile pour mettre en favoris une tâche
- [ ] pouvoir update la task quand on clique dessus. 
  - Changer comment on gère cette modif dans le back. On doit regarder quelle propriété on à reçu et seuleument modifier celle la.

- [ ] quand la todo est finie : couleur verteslide sur les border de la card. 
- [ ] quand la todo est sup/envoyé dans la corbeille mettre en rouge
- [ ] quand la todo en favoris : couleur jaune slide sur les border de la card.
- [ ] mettre le check du todo + satisfaisant, + gros, animé. Comment rendre ça + satisfaisant je pense que c'est pas assez.
- [ ] pouvoir écrire la task en markdown 
  - est ce que le markdown est pas déja pris en compte de base ? https://nextjs.org/blog/markdown
- [ ] pouvoir ajouter une image de garde
- [ ] pouvoir ajouter une image dans le texte
- [x] on:hover d'une card d'une todo la mettre en avant (zoom)
- [ ] animation de l'étoile, la grossir, la faire tourner sur elle même comme les aiguilles d'une montre ou alors comme une pièce qu'on fait tourner sur une table.
- [ ] quand on check ou delete une todo, la couleur verte/rouge slide sur la card.

Menu :
- [x] animation quand on clique sur create todo pour faire 
apparaitre le formulaire 
- [x] filtrer par si c'est finit/non finit

Trash:
- [ ] mettre les todos dans une corbeille lors de la supression d'une todo
ajouter un état de + à la todo. Il doit y avoir : Finished, Not Finished, (OnTrash ?), deleted

General :
- [ ] avoir un compte/user

Quel Langage j'utilise pour la db ? Postgres ?

Vérifier les types à ma disposition.

Comment je gère l'image dans dans la description et l'image de garde ?
  - DB:
    - User :
    mail varchar(70)?
    password varchar(100)?
    Id int/Serial ?

    - Todo :
    Title varchar(100) ?
    Description Text ?
    OwnerIds: (Id du où des Participants à la tache) Array de int/Serial ?
    State enum(Finished, Not Finished, (OnTrash ?), deleted) ?
    Tags : Text ? Array de varchar ? est ce que je créer une table Tags plutôt ?

    - Tags:
    Name: varchar(20)
    Id: int
    Color: varchar(6) (code Hexa)
 
- [ ] sync avec Google Calendar/Apple Calendar, mettre une date précise jusqu'a l'heure

Tag :
- [ ] Créer des tags de todos (School, ...) pour les classer et les trouver rapidement
- [ ] avoir une couleur/tag

Theme :
- [ ] user puisse changer la couleur/le thème. Thèmes prédéfinies. Couleur à avoir:
Primary :
Accent :
Black :

- [ ] user puisse créer son propre thème

Pèce jointe :
- [ ] ajouter une piéce jointe ex:pdf. qui apparait dans le texte (en + petit ?) faire distinction entre image de garde et image dans le texte  

Avoir des todos partagés entre les comptes :
  - [ ] pouvoir mettre une date dans son calendrier 
  - [ ] pouvoir spécifier quel user à cette tâche dans le calendrier. 
  - [ ] pouvoir cocher une case "Apparaitre/Sync dans mon/mes calendrier(s)" ? (Google agenda, Apple Agenda)


Nom:
Checked, Organizer, Organized, Check it, Do it Check it, Remember, Remembered
-> je suis parti sur Checked


Pouvoir répeter une tâche tout les X temps

pouvoir mettre les anniverssaires de sus proches et prévenir quand la date arrive