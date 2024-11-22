"use client";
import Hero from "@/app/component/hero";

export default function Terms ({ settings, help }) {

    return (

        <div>

            <Hero help={help}/>

            <main className="flex flex-column help-center">

                {
                    !help ?
                    <h1 style={{marginTop: '3rem'}}>{settings.name} Terms of Use</h1> :
                    <h1>Help Center of {settings.name}</h1>
                }

                <p>
                    Welcome to {settings.name} !

                    We help users to research and book travel experiences, post opinions of those experiences, and engage 
                    in interactive travel forums. However, we are not a travel or tour agency, and we do not provide such 
                    experiences ourselves. When you make a booking, you will be purchasing a tour, ticket or other service 
                    directly from the third-party supplier. <br /><br />

                    These Terms of Use apply to any use of {settings.name}'s services. Please read these Terms of Use carefully, 
                    as they contain important information concerning your legal rights and limitations on these rights, 
                    as well as a section regarding applicable law and jurisdiction of disputes. By accessing or 
                    using {settings.name}'s services, you are indicating that you have read these Terms of Use and agree to 
                    be bound by them. If you do not agree with all of these Terms of Use, you are not permitted to access or use the services.
                </p>

                <h1>Use of the Services</h1>

                <p>
                    2.1 As a condition of your use of the Services, you represent and warrant that (i) all information supplied by you in the 
                    course of your use of the Services is true, accurate, current and complete, and (ii) you are 13 
                    years of age or older in order to use the Website. {settings.name} does not knowingly 
                    collect the information of anyone under the age of 13.<br/><br/>

                    2.2 Your use of the Services is permitted by {settings.name} only for personal, non-commercial use and/or to make 
                    legitimate requests to make a Booking of the Products offered. You agree not to use this Services to make 
                    any speculative, false or fraudulent requests or Bookings.<br/><br/>

                    2.3 You further represent and warrant that you (a) are not currently suspended and have not previously 
                    been banned by {settings.name} from using the Services; (b) are not acting on behalf of a 
                    competitor of {settings.name}; (c) will not create more than one {settings.name} Account; 
                    and (d) have full power and authority to enter into this legally binding agreement 
                    and in doing so will not violate any other agreement to which you are a party.<br/><br/>

                    2.4 We retain the right at our sole discretion to deny access to the Services to 
                    anyone at any time and for any reason, including, but not limited to, for 
                    violation of these Terms of Use.<br/><br/>

                    2.5 In accessing or using the Website, you may be exposed to content that is offensive, 
                    indecent, inaccurate, objectionable, or otherwise inappropriate. {settings.name} 
                    does not endorse such content, and cannot vouch for its accuracy. You therefore 
                    access and use the Website at your own risk.
                </p>

                <h1>{settings.name} Accounts</h1>

                <p>
                    3.1 You may need to create a {settings.name} Account and provide information about yourself 
                    in order to use some of the features on the Website and other Services, including when 
                    you make a Booking. You are responsible for maintaining the confidentiality of your 
                    {settings.name} Account password and log-in credentials ("{settings.name} Account 
                    Credentials"). You are also solely responsible for all activities (including Bookings) 
                    that occur in connection with your {settings.name} Account. You agree to notify us 
                    immediately of any unauthorized use of your {settings.name} Account.<br/><br/>

                    3.2 Your {settings.name} Account is for your personal use only. You may not impersonate 
                    someone else (e.g., adopt the identity of a celebrity), create a {settings.name} Account 
                    for any person other than yourself, provide an e-mail address or other personal details 
                    other than your own, or create multiple {settings.name} Accounts.<br/><br/>

                    3.3 We may terminate or suspend access to your {settings.name} Account or your 
                    ability to use the Services, in whole or in part, at our sole discretion, for any 
                    or no reason, and without notice or liability of any kind. For example, we may terminate 
                    or suspend your {settings.name} Account or ability to use the Services if you misuse the 
                    Website. Any such termination or suspension could prevent you from accessing your {settings.name} 
                    Account, the Website, User Content (as defined in Section 6.1), Website Content 
                    (as defined in Section 4.1), and/or any other related information.<br/><br/>

                    3.4 You may terminate your {settings.name} Account at any time by 
                    contacting us to request that we close your {settings.name} Account, and by 
                    discontinuing your use of any and all parts of the Services. If you close your 
                    {settings.name} Account, we may continue to display your previously published User 
                    Content and are under no obligation to remove any of your User Content.<br/><br/>

                    3.5 AS A USER OF THE SERVICES, YOU UNDERSTAND AND AGREE THAT: (1) NEITHER {settings.name} 
                    NOR ITS AFFILIATES WILL HAVE ANY LIABILITY TO YOU OR OTHERS FOR ANY UNAUTHORIZED BOOKINGS 
                    MADE USING YOUR {settings.name} ACCOUNT AND/OR {settings.name} ACCOUNT CREDENTIALS; 
                    AND (2) THE UNAUTHORIZED USE OF YOUR {settings.name} ACCOUNT AND/OR {settings.name} 
                    ACCOUNT CREDENTIALS COULD CAUSE YOU TO INCUR LIABILITY TO BOTH {settings.name} AND 
                    OTHER USERS.
                </p>

                <h1>Website Prohibited Activities</h1>

                <p>
                    4.1 The content and information on the Website (including, but not limited to, messages, data, 
                    information, text, music, sound, photos, graphics, video, maps, icons, software 
                    (including Software, as defined in Section 8.2), code or other material, and 
                    collectively described herein as the "Website Content"), as well as the infrastructure 
                    used to provide such Website Content, is proprietary to us. You agree not to otherwise 
                    modify, copy, distribute, transmit, display, perform, reproduce, publish, license, 
                    create derivative works from, transfer, or sell or re-sell any Website Content, or 
                    any products or services obtained from or through the Website. Any other use of 
                    the Website Content, products and/or services requires the prior written permission of {settings.name}.<br/><br/>

                    4.2 Additionally, you agree that you will not and will not assist or enable others to:<br/><br/>

                    a. use the Website or the Website Content for any commercial or unlawful purpose;<br/><br/>

                    b. access, monitor or copy any Website Content using any robot; spider, scraper or other automated 
                    means or any manual process to access, scrape, index, retrieve or otherwise use the Website or 
                    any Website Content for any purpose without our express written permission;<br/><br/>

                    c. violate the restrictions in any robot exclusion headers on the Website or bypass or circumvent other 
                    measures employed to prevent or limit access to the Website;<br/><br/>

                    d. take any action that imposes, or may impose, in our discretion, an unreasonable or disproportionately 
                    large load on our infrastructure or makes excessive traffic demands on the Website;<br/><br/>

                    e. deep-link to any portion of the Website for any purpose without our express written permission;<br/><br/>

                    f. "frame", "mirror" or otherwise incorporate any part of the Website into any other website 
                    without our prior written authorization;<br/><br/>

                    g. attempt to modify, translate, adapt, edit, decompile, disassemble, or reverse engineer any Software;<br/><br/>

                    h. use the Website to threaten, stalk, defraud, incite, harass, or advocate the harassment of 
                    another person, or otherwise interfere with another user's use of the Website;<br/><br/>

                    i. use the Website to submit or transmit spam, chain letters, contests, junk email, pyramid 
                    schemes, surveys, or other mass messaging, whether commercial in nature or not;<br/><br/>

                    j. use the Website in a manner that may create a conflict of interest, such as trading 
                    reviews with other business owners or writing or soliciting reviews;<br/><br/>

                    k. use the Website to promote bigotry or discrimination against protected classes;<br/><br/>

                    l. use the Website to violate any third-party right, including any breach of confidence, 
                    copyright, trademark, patent, trade secret, moral right, privacy right, right of 
                    publicity, or any other intellectual property or proprietary right;<br/><br/>

                    m. use the Website to submit or transmit pornography or illegal content;<br/><br/>

                    n. use the Website to solicit personal information from minors, or to harm or 
                    threaten to cause harm to, any person including minors;<br/><br/>

                    o. attempt to gain unauthorized access to the Website, user accounts, computer 
                    systems or networks connected to the Website through hacking, password mining or any other means;<br/><br/>

                    p. use the Website to transmit any computer viruses, worms, defects, Trojan horses or other 
                    items of a destructive nature (collectively, "Viruses");<br/><br/>

                    q. use any device, software or routine that interferes with the proper working of the 
                    Website, or otherwise attempt to interfere with the proper working of the Website;<br/><br/>

                    r. use the Website to violate the security of any computer network, crack passwords or security encryption codes;<br/><br/>

                    s. disrupt or interfere with the security of, or otherwise cause harm to, the Website; or<br/><br/>

                    t. remove, circumvent, disable, damage or otherwise interfere 
                    with any security-related features of the Website, features that 
                    prevent or restrict the use or copying of Website Content, or features 
                    that enforce limitations on the use of the Website.
                </p>

                <h1>Copyright and Trademark Notices</h1>

                <p>
                    9.1 Excluding Third Party Content, the Website and all content of the Website including, 
                    but not limited to, all visual interfaces, interactive features, custom graphics, design, 
                    computer code, products, software, compilation of other content (such as compilation of 
                    third party content), and other elements and components of the Website are: ©2024 {settings.name}, 
                    Inc. All rights reserved. {settings.name} is not responsible for content on websites operated 
                    by parties other than {settings.name}. All other product or service names or slogans displayed 
                    on the Website (including those of the Products) are registered and/or common law trademarks 
                    of {settings.name}, Inc. and/or its suppliers or licensors, and may not be copied, imitated or used, 
                    in whole or in part, without the prior written permission of {settings.name} or the applicable trademark 
                    holder. In addition, the look and feel of the Website, including all page headers, custom 
                    graphics, button icons and scripts, is the service mark, trademark and/or trade dress of 
                    {settings.name} and may not be copied, imitated or used, in whole or in part, without the prior 
                    written permission of {settings.name}. All other trademarks, registered trademarks, product 
                    names and company names or logos mentioned in the Website are the property of their 
                    respective owners. Reference to any products, services, processes or other 
                    information, by trade name, trademark, manufacturer, supplier or otherwise does not constitute 
                    or imply endorsement, sponsorship or recommendation thereof by {settings.name}.<br/><br/>

                    9.2 If you are aware of an infringement of either your brand or our brand, click here 
                    and follow the Copyright Complaint Policy instructions. We only address messages 
                    concerning brand infringement at the email address ta-copyright@tripadvisor.com.
                </p>

                <h1>Pricing</h1>

                <p>
                    11.1 The price of each Product will be quoted on a per-person basis, unless otherwise specified.<br/><br/>

                    11.2 Prices are based on the local tariff at the time of quoting, converted at the prevailing 
                    foreign-exchange rate as determined by {settings.name}. See Section 12 for more information 
                    about currency conversions.<br/><br/>

                    11.3 Price quotations are subject to change without notice, until a Booking has been made.<br/><br/>

                    11.4 Unless the Supplier has otherwise specified, prices do not include any local taxes or 
                    use-fees, including foreign departure, security, port charges, park fees, customs, 
                    immigration, agricultural, passenger-facility charges or international transportation tax.<br/><br/>

                    11.5 Inclusions are determined by the Supplier. Prices do not include tips/gratuities; 
                    passport and visa fees; baggage and personal insurance; any items of a personal nature; 
                    taxes or duties; and any beverages or food that the Supplier has not 
                    specifically stated are included.
                </p>

                <h1>Payments</h1>
                
                <p>
                    13.1 When you make a Booking, {settings.name} collects your payment information and processes your payment 
                    as described in Section 14. In doing so, {settings.name} acts as the limited payment collection 
                    agent of the Supplier, collecting your payment for the applicable Product(s) on 
                    behalf of such Supplier. Full payment by credit or debit card is required to make 
                    a Booking, unless otherwise specified. The payee will be listed as {settings.name}/Tripadvisor on your statement.<br/><br/>

                    13.2 The value of your Booking may be subject to taxes, duties, foreign transaction, currency exchange 
                    or other fees. Your bank or payment card company may convert the payment into the local currency 
                    and may charge fees, resulting in differences between the amount displayed through the Platform, 
                    and the final amount charged to you. {settings.name} recommends that you contact your bank or card 
                    company if you have any questions concerning any applicable currency conversion or fees.
                </p>

                <h1>Payment Processing</h1>

                <p>
                    14.1 Under these Terms of Use, the payment processing services for the Services provided are 
                    provided by {settings.name} Limited (on behalf of {settings.name} Inc.), or by {settings.name} Inc., or by {settings.name} 
                    Systems Pty Limited, depending on the payment method used for your Booking. {settings.name} 
                    Limited's registered office address is 7 Soho Square, London W1D 3QB, UK. {settings.name} 
                    Systems Pty Limited's registered office address is Level 5, 219 Cleveland St, 
                    Redfern, NSW 2016, Australia.<br/><br/>

                    14.2 In the event you make a Booking using a credit or debit card and your payment 
                    is processed via a European acquirer, the payment processing services will be 
                    provided by {settings.name} Limited on behalf of {settings.name} Inc. (generally indicated by {settings.name} 
                    Limited being referenced on your card statement). For a Booking made using any other 
                    payment method, the payment processing services will be provided by either {settings.name} Inc. 
                    or {settings.name} Systems Pty Limited (as stated on the applicable payment statement). If your 
                    payment was processed by {settings.name} Limited or {settings.name} Inc., the Terms of Use constitute an 
                    agreement between you and {settings.name} Inc. If your payment was processed by {settings.name} Systems 
                    Pty Limited, the Terms of Use are an agreement between you and {settings.name} Systems Pty Limited, 
                    and the Services are provided to you by {settings.name} Systems Pty Limited. For the avoidance of doubt, 
                    these Terms of Use never constitute an agreement between you and {settings.name} Limited.<br/><br/><br/><br/>
                </p>

            </main>

        </div>

    )

}
