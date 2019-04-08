---
layout: article
---


# Order NemID for production

Below is a short walkthrough of the process of registering as a _NemID service provider_, "Tjenesteudbyder" in Danish.

As NemID is a proprietary Danish e-ID solution the documentation is available in Danish only.

Here is a guide to how to proceed with entering into an agreement with Nets DanID to use NemID in your company. 

Note that Nets DanID is a Danish company, and with a NemID authentication solution stricly for Danish residents/nationals. 
Therefore most of the documentation and agreements will be in Danish. Still, the steps below should give you and idea of 
is required.

The guide is based on the [Nets DanID's own description (in Danish)](http://www.nets.eu/dk-da/Service/kundeservice/nemid-tu/implementering/Pages/default.aspx#tab2),
but slightly rephrased to suit the conditions around Greans NemID as a Service. 

1. The Company Signature, the certificate used to identity your company) 
    must be ordered by your company's NemID administrator via self-service for NemID for Business (NemID employee signature). 
    The Company Signature is ordered under the heading "Øvrige signaturer" . 

   [Order the Company Signature from Nets DanID (in Danish)](https://www.medarbejdersignatur.dk/produkter/nemid_medarbejdersignatur/log_paa_nemid_selvbetjening/)

    The Company Signature is free if it is only to be used for the purpose of NemID login. 
    If you wish to make use of the offer of a free company certificate, in the ordering process indicate 
    NemID [company name] in the Name of the Company Signature. After that you must within 5 days of the order 
    send an e-mail to faktura@danid.dk with your CVR number (Danish company registry) 
    and a message that the signature is created solely for use as a NemID service provider. 
   
2.  *Remember*. Once you have ordered the Company Signature, you must locate the so-called UID number, 
    as it must be inserted in the service provider agreement together with your CVR number (company id from Danish business registry). 
    The UID number may be found in the [overview of the issued signatures](https://www.medarbejdersignatur.dk/produkter/nemid_medarbejdersignatur/nemid_selvbetjening/oevrige_signaturer/virksomhedssignatur/administrer_virksomhedssignatur/.) 

    <img style="max-width: 100%" src="/images/adminsignatur.png" alt="Comopany signature administration (in Danish)" />

3.  *Optional*. If you need also your users' social security numbers (Danish CPR), you must enter into a separate agreement 
    about Nets DanID's PID / RID services.     
    Note that when you submit the NemID service provider agreement, the PID/RID agreement must abe attached. 
    
    * [The PID/ RID Agreement is a PDF](http://www.nets.eu/dk-da/Produkter/Sikkerhed/Documents/bestil_pid_rid_cpr-tjeneste.zip)
       to be completed and uploaded with the service provider agreement. 
    * When filling out the agreement must choose to use your own company certificate, as illustrated below.
    <img style="max-width: 100%" src="/images/RIDPID-aftale1.png" alt="Brug eget virksomhedscertifikat" />
    * Note that you must fill the form with the CVR and UID from your Company Signature, as shown in the first picture. 

4.	Who should be the technical contact on the agreement with Nets DanID? With Grean handling all implementation and 
    operation of the solution, you are welcome to refer to Grean using the email address nemid@grean.com as a contact. 

    To the extent there should a need for your involvement Grean will get in touch.

    (According Nets DanID's own description: "The technical contact is the person who is involved in the technical implementation 
    of the solution, since it is also the e-mail address of that person that will receive operational information.") 

5.  Select a *friendly name* you want to associate with your solution. This will be the name that appears in the login applet 
    when your users log on to your service. This will typically be your company name. 


6.  *Optional**. Enter the IP addresses from which connections to to NemID test systems will be made. 
    Note however that since Grean already has access to NemID test systems, you should not need to specify anything here. 

7.  Once you have been through the above steps and have filled out the optional PID/RID agreement, 
    you are ready to fill out [your order to NemID](http://www.nets.eu/dk-da/Produkter/Sikkerhed/NemID-tjenesteudbyder/Pages/Bestil.aspx)

<br/>