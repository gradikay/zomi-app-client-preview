// This file is exported to ---> src/Routes.js
// React required
import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
// -------------- Application Begins Bellow ------------ //


export default class UserAgreement extends Component {

    render() {
        return (
            <>
                {/* HEADER */}
                <header className='container-fluid'>
                    {/* USER AGREEMENT */}
                    <div className='row'>
                        {/* Title */}
                        <div className='col-sm-12 mt-5'>
                            <h2>Contrat d'utilisation de Bozindo</h2>
                        </div>
                    </div>
                </header>
                {/* MAIN */}
                <main>
                    {/* SECTION - EFFECTIVE */}
                    <section className='container-fluid'>
                        {/* Effective */}
                        <div className='row'>
                            {/* Description */}
                            <div className='col-sm-12'>
                                <p><i>En vigueur le 12 d&#233;cembre 2019</i></p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION - MISSION AND TABLE OF CONTENT */}
                    <section className='container-fluid'>
                        <div className='row'>
                            {/* Mission */}
                            <div className='col-sm-6'>
                                <p>Notre mission est de connecter les professionnels congolais pour leur permettre d'&#234;tre plus productifs et performants. Nos services sont con&#231;us pour promouvoir des opportunit&#233;s &#233;conomiques pour nos membres en vous permettant ainsi qu'&#224; des millions d'autres professionnels de se rencontrer, d'&#233;changer des id&#233;es, d'apprendre et de trouver des opportunit&#233;s ou des employ&#233;s, de travailler et de prendre des d&#233;cisions dans un r&#233;seau de relations de confiance.</p>
                            </div>
                        {/* Table of Content */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h2>Table des mati&#232;res:</h2>
                                {/* List */}
                                <ol>
                                    <li><a href='#introduction'>Introduction</a></li>
                                    <li><a href='#obligations'>Obligations</a></li>
                                    <li><a href='#rights'>Droits et limites</a></li>
                                    <li><a href='#disclaimer'>Clause de non-responsabilit&#233; et limite de responsabilit&#233;</a></li>
                                    <li><a href='#termination'>R&#233;siliation</a></li>
                                    <li><a href='#governing'>Droit applicable et r&#232;glement des diff&#233;rends</a></li>
                                    <li><a href='#general'>Conditions g&#233;n&#233;rales</a></li>
                                    <li><a href='#Bozindo'>Bozindo "&#192; faire et &#224; ne pas faire"</a></li>
                                    <li><a href='#complaints'>Plaintes concernant le contenu</a></li>
                                    <li><a href='#how'>Comment nous contacter</a></li>
                                </ol>
                            </div>
                        </div>                    
                    </section>
                    {/* SECTION 1 - INTRODUCTION */}
                    <section className='container-fluid' id='introduction' >
                        <div className='row'>
                            {/* Introduction */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>1. Introduction</h3>
                                {/* Sub-Title */}
                                <h4>1.1. Contrat</h4>
                                {/* Description */}
                                <p>Vous acceptez qu'en cliquant sur "S'inscrire maintenant", "Rejoindre Bozindo", "S'inscrire" ou similaire, en vous inscrivant, en acc&#233;dant ou en utilisant nos services (d&#233;crits ci-dessous), vous acceptez de conclure un contrat juridiquement contraignant avec Bozindo (m&#234;me si vous utilisent nos Services pour le compte d'une entreprise). Si vous n'acceptez pas ce contrat ("Contrat" ou "Contrat d'utilisateur"), ne cliquez pas sur "Rejoindre maintenant" (ou similaire) et n'acc&#233;dez pas ou n'utilisez pas l'un de nos Services. Si vous souhaitez r&#233;silier ce contrat, vous pouvez &#224; tout moment le faire en fermant votre compte et en n'acc&#233;dant plus ou en n'utilisant plus nos Services.</p>
                                {/* Services */}
                                <h5>Prestations de service</h5>
                                {/* Description */}
                                <p>Ce contrat s'applique &#224; Bozindo.com, aux applications de marque Bozindo, au partage de diapositives, &#224; Bozindo Learning et &#224; d'autres sites, applications, communications et autres services li&#233;s &#224; Bozindo qui d&#233;clarent qu'ils sont offerts en vertu du pr&#233;sent contrat ("Services"), y compris la collecte hors site de les donn&#233;es de ces Services, telles que nos publicit&#233;s et les plugins "Appliquer avec Bozindo" et "Partager avec Bozindo". Les utilisateurs enregistr&#233;s de nos Services sont des "Membres" et les utilisateurs non enregistr&#233;s sont des "Visiteurs". Ce contrat s'applique aux membres et aux visiteurs.</p>
                                {/* Bozindo */}
                                <h5>Bozindo</h5>
                                {/* Description */}
                                <p>Vous concluez ce contrat avec Bozindo (&#233;galement d&#233;nomm&#233; "nous" et "nous").</p>
                                <p>Nous utilisons le terme "pays d&#233;sign&#233;s" pour d&#233;signer les pays de l'Union africaine (UA), de l'Espace &#233;conomique africain (AEA) et de la R&#233;publique d&#233;mocratique du Congo (RDC).</p>
                                <p>Si vous r&#233;sidez dans les "pays d&#233;sign&#233;s", vous concluez ce contrat avec Bozindo ("Bozindo") et Bozindo sera le responsable du traitement de vos donn&#233;es personnelles fournies, collect&#233;es par ou pour, ou trait&#233;es en relation avec nos services.</p>
                                <p>Si vous r&#233;sidez en dehors des "pays d&#233;sign&#233;s", vous concluez ce contrat avec Bozindo ("Bozindo") et Bozindo sera le responsable du traitement de vos donn&#233;es personnelles fournies, collect&#233;es par ou pour ou trait&#233;es en relation avec nos services. .</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Lorsque vous utilisez nos services, vous acceptez toutes ces conditions. Votre utilisation de nos services est &#233;galement soumise &#224; notre politique en mati&#232;re de cookies et &#224; notre politique de confidentialit&#233;, qui couvre la mani&#232;re dont nous collectons, utilisons, partageons et stockons vos informations personnelles.</p>
                            </div>
                            {/* Members and Visitors */}
                            <div className='col-sm-6'>
                                <h4>1.2. Membres et visiteurs</h4>
                                {/* Description */}
                                <p>Lorsque vous vous inscrivez et rejoignez le service Bozindo, vous devenez membre. Si vous avez choisi de ne pas vous inscrire &#224; nos Services, vous pouvez acc&#233;der &#224; certaines fonctionnalit&#233;s en tant que "Visiteur".</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Ce contrat s'applique aux membres et aux visiteurs.</p>
                            </div>
                            {/* Change */}
                            <div className='col-sm-6'>
                                <h4>1.3. Changement</h4>
                                {/* Description */}
                                <p>Nous pouvons modifier ce contrat, notre politique de confidentialit&#233; et nos politiques de cookies de temps en temps. Si nous y apportons des modifications importantes, nous vous en informerons par le biais de nos Services, ou par d'autres moyens, pour vous donner la possibilit&#233; d'examiner les modifications avant qu'elles ne prennent effet. Nous convenons que les modifications ne peuvent pas &#234;tre r&#233;troactives. Si vous vous opposez &#224; toute modification, vous pouvez fermer votre compte. Votre utilisation continue de nos services apr&#232;s avoir publi&#233; ou envoy&#233; un avis sur nos modifications de ces conditions signifie que vous acceptez les conditions mises &#224; jour.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Ce contrat s'applique aux membres et aux visiteurs.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 2 - OBLIGAGTIONS  */}
                    <section className='container-fluid' id='obligations' >
                        {/* Obligations */}
                        <div className='row'>
                            {/* Section 2 */}
                            <div className='col-sm-6'>
                                {/* Title - Obligation */}
                                <h3>2. Obligations</h3>
                                {/* Sub-Title - Service Eligibility */}
                                <h4>2.1. Admissibilit&#233; au service</h4>
                                {/* Description */}
                                <p>Les Services ne doivent pas &#234;tre utilis&#233;s par des personnes de moins de 16 ans.</p>
                                <p>Pour utiliser les Services, vous acceptez que: (1) vous devez avoir "l'&#226;ge minimum" (d&#233;crit ci-dessous) ou plus; (2) vous n'aurez qu'un seul compte Bozindo qui doit &#234;tre &#224; votre vrai nom; et (3) vous n'&#234;tes pas d&#233;j&#224; emp&#234;ch&#233; par Bozindo d'utiliser les Services. La cr&#233;ation d'un compte contenant de fausses informations constitue une violation de nos conditions, y compris des comptes enregistr&#233;s au nom d'autrui ou de personnes de moins de 16 ans.</p>
                                <p>"&#194;ge minimum" signifie 16 ans. Cependant, si la loi exige que vous soyez plus &#226;g&#233; pour que Bozindo vous fournisse l&#233;galement les Services sans le consentement des parents (y compris l'utilisation de vos donn&#233;es personnelles), alors l'&#226;ge minimum est cet &#226;ge plus avanc&#233;.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Voici quelques promesses que vous nous faites dans ce contrat:</p>
                                <p>Vous &#234;tes admissible &#224; conclure ce contrat et vous &#234;tes au moins notre "&#226;ge minimum".</p>
                            </div>
                            {/* Section 2.2  */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Your Account */}
                                <h4>2.2. Votre compte</h4>
                                {/* Description */}
                                <p>Les membres sont titulaires de compte. Vous vous engagez &#224;: (1) essayer de choisir un mot de passe solide et s&#233;curis&#233;; (2) garder votre mot de passe s&#233;curis&#233; et confidentiel; (3) ne transf&#233;rez aucune partie de votre compte (par exemple, les connexions) et (4) respectez la loi et notre liste de choses &#224; faire et &#224; ne pas faire et les politiques de la communaut&#233; professionnelle. Vous &#234;tes responsable de tout ce qui se produit via votre compte, sauf si vous le fermez ou signalez une utilisation abusive.</p>
                                <p>Entre vous et les autres (y compris votre employeur), votre compte vous appartient. Cependant, si les Services ont &#233;t&#233; achet&#233;s par une autre partie pour que vous puissiez les utiliser (par exemple, un si&#232;ge de recruteur achet&#233; par votre employeur), la partie qui paie pour ce Service a le droit de contr&#244;ler l'acc&#232;s &#224; et d'obtenir des rapports sur votre utilisation de ce Service payant; cependant, ils n'ont pas de droits sur votre compte personnel.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Vous garderez votre mot de passe secret.</p>
                                <p>Vous ne partagerez pas de compte avec quelqu'un d'autre et vous suivrez nos r&#232;gles et la loi.</p>
                            </div>
                            {/* Section 2.3  */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Payment */}
                                <h4>2.3. Paiement</h4>
                                {/* Description */}
                                <p>Si vous achetez l'un de nos Services payants ("Services Premium"), vous vous engagez &#224; nous payer les frais et taxes applicables ainsi que des conditions suppl&#233;mentaires sp&#233;cifiques aux Services pay&#233;s. Le non-paiement de ces frais entra&#238;nera la r&#233;siliation de vos Services pay&#233;s. De plus, vous acceptez que:</p>
                                {/* List */}
                                <ul>
                                    <li>Votre achat peut &#234;tre soumis &#224; des frais de change ou &#224; des diff&#233;rences de prix en fonction de l'emplacement (par exemple, les taux de change).</li>
                                    <li>Nous pouvons stocker et continuer &#224; facturer votre mode de paiement (par exemple, votre carte de cr&#233;dit) m&#234;me apr&#232;s son expiration, afin d'&#233;viter des interruptions dans vos services et d'utiliser pour payer d'autres services que vous pouvez acheter.</li>
                                    <li>Si vous achetez un abonnement, votre mode de paiement sera automatiquement d&#233;bit&#233; au d&#233;but de chaque p&#233;riode d'abonnement pour les frais et taxes applicables &#224; cette p&#233;riode. Pour &#233;viter des frais futurs, annulez avant la date de renouvellement. D&#233;couvrez comment annuler ou suspendre vos services Premium.</li>
                                    <li>Tous vos achats de Services sont soumis &#224; la politique de remboursement de Bozindo.</li>
                                    <li>Nous pouvons calculer les taxes que vous devez payer en fonction des informations de facturation que vous nous fournissez au moment de l'achat.</li>
                                </ul>
                                <p>Vous pouvez obtenir une copie de votre facture via les param&#232;tres de votre compte Bozindo sous "Historique des achats".</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Vous respecterez vos obligations de paiement et vous acceptez que nous stockions vos informations de paiement. Vous comprenez que des frais et des taxes peuvent s'ajouter &#224; nos prix.</p>
                                <p>Nous ne garantissons pas les remboursements</p>
                            </div>
                            {/* Section 2.4  */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Notice and Messages */}
                                <h4>2.4. Avis et messages</h4>
                                {/* Description */}
                                <p>Vous acceptez que nous vous fournirons des notifications et des messages des mani&#232;res suivantes: (1) dans le Service, ou (2) envoy&#233;es aux coordonn&#233;es que vous nous avez fournies (par exemple, e-mail, num&#233;ro de mobile, adresse physique). Vous vous engagez &#224; maintenir vos coordonn&#233;es &#224; jour.</p>
                                <p>Veuillez revoir vos param&#232;tres pour contr&#244;ler et limiter les messages que vous recevez de notre part.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Vous acceptez que nous vous fournissions des notifications et des messages via nos sites Web, nos applications et nos coordonn&#233;es. Si vos coordonn&#233;es sont obsol&#232;tes, vous risquez de manquer des avis importants.</p>
                            </div>
                            {/* Section 2.5  */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Sharing */}
                                <h4>2.5. Partage</h4>
                                {/* Description */}
                                <p>Nos services permettent la messagerie et le partage d'informations de plusieurs fa&#231;ons, telles que votre profil, les diapositives, les liens vers des articles de presse, des offres d'emploi, des courriels et des blogs. Les informations et le contenu que vous partagez ou publiez peuvent &#234;tre vus par d'autres membres, visiteurs ou autres (y compris hors des services). Lorsque nous avons rendu les param&#232;tres disponibles, nous respecterons les choix que vous faites concernant les personnes qui peuvent voir le contenu ou les informations (par exemple, le contenu des messages &#224; vos destinataires, le partage de contenu uniquement avec les connexions Bozindo, la restriction de la visibilit&#233; de votre profil &#224; partir des moteurs de recherche ou le choix de ne pas notifier d'autres de la mise &#224; jour de votre profil Bozindo). Pour les activit&#233;s de recherche d'emploi, nous ne communiquons pas par d&#233;faut &#224; votre r&#233;seau de connexions ou au public. Donc, si vous postulez pour un emploi via notre service ou choisissez de signaler que vous &#234;tes int&#233;ress&#233; par un emploi, notre d&#233;faut est de le partager uniquement avec l'affiche de l'emploi.</p>
                                <p>Nous ne sommes pas oblig&#233;s de publier des informations ou du contenu sur notre Service et pouvons les supprimer &#224; notre seule discr&#233;tion, avec ou sans pr&#233;avis.
</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Lorsque vous partagez des informations sur nos Services, les autres peuvent voir, copier et utiliser ces informations.
</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 3 - RIGHTS AND LIMITS */}
                    <section className='container-fluid' id='rights' >
                        {/* Rights and Limits */}
                        <div className='row'>
                            {/* Section 3 */}
                            <div className='col-sm-6'>
                                {/* Title - Right and Limits */}
                                <h3>3. Droits et limites</h3>
                                {/* Sub-Title - Your License to Bozindo */}
                                <h4>3.1. Votre licence pour Bozindo</h4>
                                {/* Description */}
                                <p>Entre vous et Bozindo, vous &#234;tes propri&#233;taire du contenu et des informations que vous soumettez ou publiez aux Services, et vous n'accordez &#224; Bozindo et &#224; nos soci&#233;t&#233;s affili&#233;es que la licence non exclusive suivante:</p>
                                <p>Un droit mondial, transf&#233;rable et sous-licenciable d'utiliser, de copier, de modifier, de distribuer, de publier et de traiter les informations et le contenu que vous fournissez par le biais de nos Services et des services de tiers, sans autre consentement, avis et / ou compensation &#224; vous ou &#224; d'autres . Ces droits sont limit&#233;s des mani&#232;res suivantes:</p>
                                {/* Lists */}
                                <ul>
                                    <li>Vous pouvez mettre fin &#224; cette licence pour un contenu sp&#233;cifique en supprimant ce contenu des Services, ou g&#233;n&#233;ralement en fermant votre compte, sauf (a) dans la mesure o&#250; vous l'avez partag&#233; avec d'autres dans le cadre du Service et qu'ils l'ont copi&#233;, re-partag&#233; ou stock&#233; et (b) pendant le temps raisonnable n&#233;cessaire pour supprimer de la sauvegarde et d'autres syst&#232;mes.</li>
                                    <li>Nous n'inclurons pas votre contenu dans des publicit&#233;s pour les produits et services de tiers &#224; des tiers sans votre consentement s&#233;par&#233; (y compris le contenu sponsoris&#233;). Cependant, nous avons le droit, sans paiement &#224; vous ou &#224; d'autres, de diffuser des annonces &#224; proximit&#233; de votre contenu et de vos informations, et vos actions sociales peuvent &#234;tre visibles et incluses dans les annonces, comme indiqu&#233; dans la politique de confidentialit&#233;.</li>
                                    <li>Nous obtiendrons votre consentement si nous voulons donner &#224; d'autres le droit de publier votre contenu au-del&#224; des Services. Cependant, si vous choisissez de partager votre publication en tant que "public", nous activerons une fonctionnalit&#233; qui permet aux autres membres d'int&#233;grer cette publication publique dans des services tiers, et nous permettons aux moteurs de recherche de rendre ce contenu public accessible via leurs services.</li>
                                    <li>Bien que nous puissions &#233;diter et apporter des changements de format &#224; votre contenu (comme le traduire, modifier la taille, la mise en page ou le type de fichier ou supprimer des m&#233;tadonn&#233;es), nous ne modifierons pas la signification de votre expression.</li>
                                    <li>&#201;tant donn&#233; que vous &#234;tes propri&#233;taire de votre contenu et de vos informations et que nous n'en avons que des droits non exclusifs, vous pouvez choisir de les mettre &#224; la disposition d'autres personnes, y compris aux termes d'une <a href='https://creativecommons.org/licenses/' target='_blank' rel="noopener noreferrer">Licence Creative Commons.</a></li>
                                </ul>
                                <p>Vous et Bozindo acceptez que nous puissions acc&#233;der, stocker, traiter et utiliser toutes les informations et donn&#233;es personnelles que vous fournissez conform&#233;ment aux termes de la politique de confidentialit&#233; et &#224; vos choix (y compris les param&#232;tres).</p>
                                <p>En soumettant &#224; Bozindo des suggestions ou d'autres commentaires concernant nos Services, vous acceptez que Bozindo puisse utiliser et partager (mais n'y est pas oblig&#233;) ces commentaires &#224; toutes fins sans compensation pour vous.</p>
                                <p>Vous acceptez de ne fournir que du contenu ou des informations qui ne violent pas la loi ni les droits de quiconque (y compris les droits de propri&#233;t&#233; intellectuelle). Vous acceptez &#233;galement que les informations de votre profil seront v&#233;ridiques. Bozindo peut &#234;tre tenu par la loi de supprimer certaines informations ou contenus dans certains pays.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Vous &#234;tes propri&#233;taire de l'ensemble du contenu, des commentaires et des informations personnelles que vous nous fournissez, mais vous nous accordez &#233;galement une licence non exclusive.</p>
                                <p>Nous respecterons les choix que vous ferez quant &#224; la personne qui aura acc&#232;s &#224; vos informations et &#224; votre contenu, y compris la mani&#232;re dont ils peuvent &#234;tre utilis&#233;s pour les annonces.</p>
                                <p>Vous et Bozindo acceptez que si le contenu comprend des donn&#233;es personnelles, il est soumis &#224; notre politique de confidentialit&#233;.</p>
                                <p>Vous vous engagez &#224; ne fournir que des informations et du contenu que vous avez le droit de partager et que votre profil Bozindo sera v&#233;ridique.</p>
                            </div>
                            {/* Section 3.2 */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Service Evalability */}
                                <h4>3.2. Disponibilit&#233; du service</h4>
                                {/* Description */}
                                <p>Nous pouvons modifier ou interrompre l'un de nos services. Nous ne promettons pas de stocker ou de continuer &#224; afficher les informations et le contenu que vous avez publi&#233;s.</p>
                                <p>Bozindo n'est pas un service de stockage. Vous acceptez que nous n'avons aucune obligation de stocker, de maintenir ou de vous fournir une copie de tout contenu ou information que vous ou d'autres fournissez, sauf dans la mesure requise par la loi applicable et comme indiqu&#233; dans notre politique de confidentialit&#233;.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nous pouvons changer, suspendre ou mettre fin &#224; tout Service, ou changer et modifier les prix de mani&#232;re prospective &#224; notre discr&#233;tion. Dans la mesure permise par la loi, ces modifications peuvent &#234;tre effectives sur pr&#233;avis qui vous est fourni.</p>
                            </div>
                            {/* Section 3.3 */}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Other Content, Sites and Apps */}
                                <h4>3.3. Autres contenus, sites et applications</h4>
                                {/* Description */}
                                <p>En utilisant les Services, vous pouvez rencontrer du contenu ou des informations qui pourraient &#234;tre inexacts, incomplets, retard&#233;s, trompeurs, ill&#233;gaux, offensants ou autrement nuisibles. Bozindo n'examine g&#233;n&#233;ralement pas le contenu fourni par nos membres ou autres. Vous acceptez que nous ne sommes pas responsables du contenu ou des informations des autres (y compris les autres membres). Nous ne pouvons pas toujours emp&#234;cher cette utilisation abusive de nos Services, et vous acceptez que nous ne sommes pas responsables d'une telle utilisation abusive. Vous reconnaissez &#233;galement le risque que vous ou votre organisation soyez associ&#233; par erreur &#224; du contenu sur d'autres lorsque nous informons les connexions et les abonn&#233;s que vous ou votre organisation avez &#233;t&#233; mentionn&#233; dans les actualit&#233;s. Les membres ont le choix sur cette fonctionnalit&#233;.</p>
                                <p>You are responsible for deciding if you want to access or use third-party apps or sites that link from our Services. If you allow a third-party app or site to authenticate you or connect with your Bozindo account, that app or site can access information on Bozindo related to you and your connections. Third-party apps and sites have their own legal terms and privacy policies, and you may be giving others permission to use your information in ways we would not. Except to the limited extent it may be required by applicable law, Bozindo is not responsible for these other sites and apps - use these at your own risk.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Votre utilisation du contenu et des informations des autres publi&#233;s sur nos Services est &#224; vos propres risques.</p>
                                <p>D'autres peuvent offrir leurs propres produits et services par le biais de nos services, et nous ne sommes pas responsables de ces activit&#233;s de tiers.</p>
                            </div>
                            {/* Section 3.4*/}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Limits */}
                                <h4>3.4. Limites</h4>
                                {/* Description */}
                                <p>Bozindo se r&#233;serve le droit de limiter votre utilisation des Services, y compris le nombre de vos connexions et votre capacit&#233; &#224; contacter d'autres Membres. Bozindo se r&#233;serve le droit de restreindre, de suspendre ou de r&#233;silier votre compte si Bozindo estime que vous pouvez enfreindre le pr&#233;sent contrat ou la loi ou utiliser de mani&#232;re abusive les services (par exemple, violer l'une des choses &#224; faire et &#224; ne pas faire ou les politiques de la communaut&#233; professionnelle).</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nous avons le droit de limiter la fa&#231;on dont vous vous connectez et interagissez sur nos services.</p>
                            </div>
                            {/* Section 3.5*/}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Intellectual Property Rights */}
                                <h4>3.5. Droits de propri&#233;t&#233; intellectuelle</h4>
                                {/* Description */}
                                <p>Bozindo se r&#233;serve tous ses droits de propri&#233;t&#233; intellectuelle sur les Services. L'utilisation des Services ne vous conf&#232;re aucun droit de propri&#233;t&#233; sur nos Services ni sur le contenu ou les informations mis &#224; disposition via nos Services. Les marques et logos utilis&#233;s en relation avec les Services sont les marques d&#233;pos&#233;es de leurs propri&#233;taires respectifs. Bozindo et les logos "in" et autres marques commerciales, marques de service, graphiques et logos Bozindo utilis&#233;s pour nos Services sont des marques commerciales ou des marques d&#233;pos&#233;es de Bozindo.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nous vous informons de nos droits de propri&#233;t&#233; intellectuelle.</p>
                            </div>
                            {/* Section 3.6*/}
                            <div className='col-sm-6'>
                                {/* Sub-Title - Automated Processing */}
                                <h4>3.6. Traitement automatis&#233;</h4>
                                {/* Description */}
                                <p>Nous utiliserons les informations et les donn&#233;es que vous fournissez et que nous avons sur les Membres pour faire des recommandations concernant les connexions, le contenu et les fonctionnalit&#233;s qui pourraient vous &#234;tre utiles. Par exemple, nous utilisons des donn&#233;es et des informations vous concernant pour vous recommander des emplois et vous-m&#234;me aux recruteurs. Garder votre profil exact et &#224; jour nous aide &#224; rendre ces recommandations plus pr&#233;cises et pertinentes.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nous utilisons les donn&#233;es et informations vous concernant pour vous faire des suggestions pertinentes &#224; vous et aux autres.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 4 - DISCLAIMER AND LIMIT OF LIABILITY */}
                    <section className='container-fluid' id='disclaimer' >
                        {/* Termination */}
                        <div className='row'>
                            {/* Section 4 */}
                            <div className='col-sm-6'>
                                {/* SubSub-Title - Termination */}
                                <h3>4. Clause de non-responsabilit&#233; et limite de responsabilit&#233;</h3>
                                {/* Description */}
                                <p>DANS LA MESURE AUTORIS&#201;E PAR LA LOI (ET &#192; MOINS QUE BOZINDO SOIT CONCLUE DANS UN ACCORD &#201;CRIT S&#201;PAR&#201; QUI REMPLACE CE CONTRAT), Bozindo ET SES AFFILI&#201;S (ET CEUX QUI TRAVAILLENT AVEC Bozindo POUR FOURNIR LES SERVICES) NE SERONT PAS RESPONSABLES ENVERS VOUS OU LES AUTRES POUR TOUT INDIRECT , DOMMAGES ACCESSOIRES, SP&#201;CIAUX, CONS&#201;CUTIFS OU PUNITIFS, OU TOUTE PERTE DE DONN&#201;ES, D'OPPORTUNIT&#201;S, DE R&#201;PUTATION, DE PROFITS OU DE REVENUS, LI&#201;S AUX SERVICES (EG, D&#201;CLARATIONS OFFENSIVES OU DIFFAMATOIRES, TEMPS OU PERTE, UTILISATION OU MODIFICATION DE VOS INFORMATIONS OU CONTENU).</p>
                                <p>EN AUCUN CAS, LA RESPONSABILIT&#201; DE BOZINDO ET DE SES AFFILI&#201;S (ET CELLES AVEC LESQUELLES BOZINDO TRAVAILLE POUR FOURNIR LES SERVICES) NE D&#201;PASSERA, DANS L'AGR&#201;GAT POUR TOUTES LES R&#201;CLAMATIONS, UN MONTANT QUI EST LE MOINS DE (A) CINQ FOIS LE PLUS R&#201;CENT MENSUEL OU ANNUEL FRAIS QUE VOUS AVEZ PAY&#201; POUR UN SERVICE PREMIUM, LE CAS &#201;CH&#201;ANT, OU (B) 100 $ US.</p>
                                <p>CETTE LIMITATION DE RESPONSABILIT&#201; FAIT PARTIE DE LA BASE DE L'AFFAIRE ENTRE VOUS ET BOZINDO ET S'APPLIQUE &#192; TOUTES LES R&#201;CLAMATIONS DE RESPONSABILIT&#201; (EXEMPLE DE GARANTIE, DE TORT, DE N&#201;GLIGENCE, DE CONTRAT, DE LOI) ET M&#202;ME SI BOZINDO OU SES AFFILI&#201;S ONT &#201;T&#201; DONN&#201; LA POSSIBILIT&#201; DE TOUT TEL DOMMAGE, ET M&#202;ME SI CES RECOURS MANQUENT &#192; LEUR OBJECTIF ESSENTIEL.</p>
                                <p>CERTAINES LOIS NE PERMETTENT PAS LA LIMITATION OU L'EXCLUSION DE RESPONSABILIT&#201;, DONC CES LIMITES PEUVENT NE PAS S'APPLIQUER &#192; VOUS.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Ce sont les limites de la responsabilit&#233; juridique que nous pouvons avoir envers vous.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 5 - TERMINATION */}
                    <section className='container-fluid' id='termination' >
                        {/* Termination */}
                        <div className='row'>
                            {/* Section 5 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>5. R&#233;siliation</h3>
                                {/* Description */}
                                <p>Vous et Bozindo pouvez r&#233;silier ce contrat &#224; tout moment avec pr&#233;avis &#224; l'autre. En cas de r&#233;siliation, vous perdez le droit d'acc&#233;der ou d'utiliser les Services. Les &#233;l&#233;ments suivants survivront &#224; la r&#233;siliation:</p>
                                {/* Lists */}
                                <ul>
                                    <li>Nos droits d'utiliser et de divulguer vos commentaires;</li>
                                    <li>Les droits des membres et / ou des visiteurs de partager &#224; nouveau le contenu et les informations que vous avez partag&#233;s via le service dans la mesure o&#250; ils ont &#233;t&#233; copi&#233;s ou re-partag&#233;s avant la r&#233;siliation;</li>
                                    <li>Les articles 4, 6, 7 et 8.2 du pr&#233;sent contrat;</li>
                                    <li>Tous les montants dus par l'une ou l'autre des parties avant la r&#233;siliation restent dus apr&#232;s la r&#233;siliation.</li>
                                </ul>
                                <p>Vous pouvez nous envoyer un e-mail <strong> gradi@yebana.com </strong> pour fermer votre compte.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nous pouvons chacun mettre fin &#224; ce contrat &#224; tout moment.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 6 - GOVERNING LAW AND DISPUTE RESOLUTION  */}
                    <section className='container-fluid' id='governing' >
                        {/* Governing Law and Dispute Resolution */}
                        <div className='row'>
                            {/* Section 6 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>6. Droit applicable et r&#232;glement des diff&#233;rends</h3>
                                {/* Excerpt */}
                                <p>Pour d'autres personnes en dehors des pays d&#233;sign&#233;s, y compris ceux qui vivent en dehors des &#201;tats-Unis: vous et Bozindo acceptez que les lois de l'&#201;tat de G&#233;orgie, &#201;tats-Unis, &#224; l'exclusion de ses r&#232;gles de conflit de lois, r&#233;gissent exclusivement tout diff&#233;rend relatif au pr&#233;sent contrat et / ou les services. Vous et Bozindo acceptez tous deux que toutes les r&#233;clamations et litiges ne peuvent &#234;tre port&#233;s qu'en justice devant les tribunaux f&#233;d&#233;raux ou &#233;tatiques du comt&#233; de DeKalb, G&#233;orgie, &#201;tats-Unis, et vous et Bozindo acceptez chacun de vous attribuer une comp&#233;tence personnelle devant ces tribunaux.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Dans le cas peu probable o&#250; nous nous retrouverions dans un litige, Bozindo et vous acceptez de le r&#233;soudre en G&#233;orgie, aux &#201;tats-Unis, en utilisant les lois de la G&#233;orgie aux &#201;tats-Unis.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 7 - GENERAL TERMS*/}
                    <section className='container-fluid' id='general' >
                        {/* General */}
                        <div className='row'>
                            {/* Section 7 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>7. Conditions g&#233;n&#233;rales</h3>
                                {/* Description */}
                                <p>Si un tribunal ayant autorit&#233; sur le pr&#233;sent Contrat estime qu'une partie de celui-ci est inapplicable, vous et nous convenons que le tribunal devrait modifier les conditions pour rendre cette partie ex&#233;cutoire tout en poursuivant son intention. Si le tribunal ne peut pas le faire, vous et nous nous engageons &#224; demander au tribunal de supprimer cette partie inapplicable et de faire respecter le reste du pr&#233;sent contrat.</p>
                                <p>Dans la mesure permise par la loi, la version en langue anglaise de ce contrat est contraignante et les autres traductions sont uniquement &#224; des fins de commodit&#233;. Ce contrat (y compris les conditions suppl&#233;mentaires que nous pouvons fournir lorsque vous vous engagez avec une caract&#233;ristique des services) est le seul accord entre nous concernant les services et remplace tous les accords ant&#233;rieurs pour les services.</p>
                                <p>Si nous n'agissons pas pour faire respecter une violation de ce contrat, cela ne signifie pas que Bozindo a renonc&#233; &#224; son droit de faire respecter ce contrat. Vous ne pouvez pas c&#233;der ou transf&#233;rer ce Contrat (ou votre adh&#233;sion ou utilisation des Services) &#224; quiconque sans notre consentement. Cependant, vous acceptez que Bozindo puisse c&#233;der ce contrat &#224; ses soci&#233;t&#233;s affili&#233;es ou &#224; une partie qui l'ach&#232;te sans votre consentement. Il n'y a pas de tiers b&#233;n&#233;ficiaires de ce contrat.</p>
                                <p>Vous acceptez que le seul moyen de nous fournir un avis juridique soit aux adresses fournies &#224; la section 10.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Voici quelques d&#233;tails importants sur le contrat.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 8 - Bozindo DOS AND DONTS */}
                    <section className='container-fluid' id='Bozindo' >
                        {/* Bozindo Dos and Don'ts */}
                        <div className='row'>
                            {/* Section 8 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>8. Bozindo "Choses &#224; faire et &#224; ne pas faire" </h3>
                                {/* Sub-Title */}
                                <h4>8.1. Choses &#224; faire</h4>
                                {/* Description */}
                                <p>Vous vous engagez &#224;:</p>
                                {/* List */}
                                <ol type="a">
                                    <li>Toutes les lois applicables, y compris, sans s'y limiter, les lois sur la confidentialit&#233;, les lois sur la propri&#233;t&#233; intellectuelle, les lois anti-spam, les lois sur le contr&#244;le des exportations, les lois fiscales et les exigences r&#233;glementaires;</li>
                                    <li>Nous fournir des informations exactes et tenez-les &#224; jour;</li>
                                    <li>Utilisez votre vrai nom sur votre profil; et</li>
                                    <li>Utilisez les Services de mani&#232;re professionnelle.</li>
                                </ol>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Bozindo est une communaut&#233; de professionnels. Cette liste de "choses &#224; faire et &#224; ne pas faire" ainsi que nos politiques communautaires professionnelles limitent ce que vous pouvez et ne pouvez pas faire sur nos services.</p>
                            </div>
                            {/* Section 8.2 */}
                            <div className='col-sm-6'>
                                {/* Sub-Title */}
                                <h4>8.2. Choses &#224; ne pas faire</h4>
                                {/* Description */}
                                <p>Vous vous engagez &#224;:</p>
                                {/* Lists */}
                                <ol type='a'>
                                    <li>Cr&#233;er une fausse identit&#233; sur Bozindo, d&#233;former votre identit&#233;, cr&#233;er un profil de membre pour quelqu'un d'autre que vous (une personne r&#233;elle), ou utiliser ou tenter d'utiliser le compte d'un autre;</li>
                                    <li>D&#233;velopper, prendre en charge ou utiliser des logiciels, des appareils, des scripts, des robots ou tout autre moyen ou processus (y compris les robots d'exploration, les plug-ins de navigateur et les modules compl&#233;mentaires, ou toute autre technologie) pour gratter les Services ou copier autrement les profils et autres donn&#233;es des Services;</li>
                                    <li>Ignorer toute fonctionnalit&#233; de s&#233;curit&#233; ou contourner ou contourner les contr&#244;les d'acc&#232;s ou les limites d'utilisation du Service (tels que les plafonds de recherche par mot cl&#233; ou les vues de profil);</li>
                                    <li>Copier, utiliser, divulguer ou distribuer toute information obtenue des Services, que ce soit directement ou par l'interm&#233;diaire de tiers (tels que les moteurs de recherche), sans le consentement de Bozindo;</li>
                                    <li>Divulguer des informations que vous n'avez pas le consentement de divulguer (telles que des informations confidentielles d'autrui (y compris votre employeur));</li>
                                    <li>Violer les droits de propri&#233;t&#233; intellectuelle d'autrui, y compris les droits d'auteur, brevets, marques de commerce, secrets commerciaux ou autres droits de propri&#233;t&#233;. Par exemple, ne copiez pas ou ne distribuez pas (sauf par le biais de la fonctionnalit&#233; de partage disponible) les messages ou tout autre contenu d'autrui sans leur autorisation, qu'ils peuvent donner en publiant sous une licence Creative Commons;</li>
                                    <li>Violer la propri&#233;t&#233; intellectuelle ou d'autres droits de Bozindo, y compris, sans limitation, (i) la copie ou la distribution de nos vid&#233;os d'apprentissage ou d'autres mat&#233;riaux ou (ii) la copie ou la distribution de notre technologie, sauf si elle est publi&#233;e sous des licences open source; (iii) utiliser le mot "Bozindo" ou nos logos dans un nom commercial, un e-mail ou une URL, sauf dans les cas pr&#233;vus par les directives de marque;</li>
                                    <li>Publiez tout ce qui contient des virus logiciels, des vers ou tout autre code nuisible;</li>
                                    <li>Faire de l'ing&#233;nierie inverse, d&#233;compiler, d&#233;sassembler, d&#233;chiffrer ou tenter de toute autre mani&#232;re de d&#233;river le code source des Services ou de toute technologie connexe qui n'est pas open source;</li>
                                    <li>Impliquer ou d&#233;clarer que vous &#234;tes affili&#233; ou approuv&#233; par Bozindo sans notre consentement expr&#232;s (par exemple, en vous repr&#233;sentant en tant que formateur accr&#233;dit&#233; Bozindo);</li>
                                    <li>Louer, louer, pr&#234;ter, &#233;changer, vendre / revendre ou autrement mon&#233;tiser les Services ou les donn&#233;es connexes ou acc&#233;der &#224; ceux-ci, sans le consentement de Bozindo;</li>
                                    <li> Cr&#233;er un lien profond vers nos services &#224; d'autres fins que la promotion de votre profil ou d'un groupe sur nos services, sans le consentement de Bozindo; </li>
                                    <li> Utilisez des robots ou d'autres m&#233;thodes automatis&#233;es pour acc&#233;der aux services, ajouter ou t&#233;l&#233;charger des contacts, envoyer ou rediriger des messages; </li>
                                    <li> Surveillez la disponibilit&#233;, les performances ou les fonctionnalit&#233;s des Services &#224; des fins concurrentielles; </li>
                                    <li> S'engager dans le "cadrage", la "mise en miroir" ou autrement simuler l'apparence ou la fonction des Services; </li>
                                    <li> Superposer ou autrement modifier les Services ou leur apparence (par exemple en ins&#233;rant des &#233;l&#233;ments dans les Services ou en supprimant, couvrant ou masquant une publicit&#233; incluse sur les Services); </li>
                                    <li> Interf&#233;rer avec le fonctionnement ou imposer une charge d&#233;raisonnable sur les Services (par exemple, spam, attaque par d&#233;ni de service, virus, algorithmes de jeu); et / ou </li>
                                    <li> Violer les politiques de la communaut&#233; professionnelle ou toute autre condition suppl&#233;mentaire concernant un service sp&#233;cifique qui est fournie lorsque vous vous inscrivez ou commencez &#224; utiliser ce service. </li>
                                </ol>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Bozindo est une communaut&#233; de professionnels. Cette liste de "choses &#224; faire et &#224; ne pas faire" ainsi que nos politiques communautaires professionnelles limitent ce que vous pouvez et ne pouvez pas faire sur nos services.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 9 - COMPLAINTS REGARDING CONTENT */}
                    <section className='container-fluid' id='complaints' >
                        {/* Complaints Regarding Content */}
                        <div className='row'>
                            {/* Section 9 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>9. Plaintes concernant le contenu</h3>
                                {/* Description */}
                                <p>Nous respectons les droits de propri&#233;t&#233; intellectuelle d'autrui. Nous exigeons que les informations publi&#233;es par les membres soient exactes et ne violent pas les droits de propri&#233;t&#233; intellectuelle ou d'autres droits de tiers. Nous fournissons une politique et un processus pour les plaintes concernant le contenu publi&#233; par nos membres.</p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Coordonn&#233;es de r&#233;clamation concernant le contenu fourni par nos membres.</p>
                            </div>
                        </div>
                    </section>
                    {/* SECTION 10 - HOW TO CONTACT US */}
                    <section className='container-fluid' id='how' >
                        {/* How to Contact Us */}
                        <div className='row'>
                            {/* Section 10 */}
                            <div className='col-sm-6'>
                                {/* Title */}
                                <h3>10. Comment nous contacter </h3>
                                {/* Description */}
                                <p>Si vous souhaitez nous envoyer des notifications ou un service de proc&#233;dure, veuillez nous contacter:</p>
                                <p><a href='https://www.facebook.com/bozindo' target='_blank' rel="noopener noreferrer">Facebook</a> OR BY <Link to='/about/bozindo'>Email</Link></p>
                            </div>
                            {/* Excerpt */}
                            <div className='col-sm-4'>
                                <p>Nos coordonn&#233;es. Notre centre d'aide fournit &#233;galement des informations sur nos services.</p>
                            </div>
                        </div>
                    </section>

                </main>
            </>
            );
    }

}