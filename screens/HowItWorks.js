import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {styles, topBar} from '../styleSheeet/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {howitWorksStyling} from '../styleSheeet/screenStyles';
import store3 from '../redux/store3';
function HowItWorks(props) {
  
  return (
    <View style={howitWorksStyling.container}>
      <View style={topBar.categoriesOverall}>
        <FontAwesome5.Button
          name={'bars'}
          size={
            ((Dimensions.get('window').height / 10) *
              Dimensions.get('window').width) /
            10 /
            90
          }
          color={'black'}
          backgroundColor={'white'}
          style={topBar.iconStyle}
          onPress={() => props.navigation.toggleDrawer()}
        />
        <Text style={topBar.heading}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'How It Works'
            ):(
              'یہ کیسے کام کرتا ہے'
            )
          }
          </Text>
      </View>
      <ScrollView style={howitWorksStyling.scrollContainer}>
        {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            <Text style={howitWorksStyling.text}>
            What is SASA?{'\n\n'}
            SASA (Salon Appointment and Scheduling Application) is a platform for
            connecting a wide range of salon businesses with their customers under
            one platform. It connects customers and salons in an online community
            which allow users to surf salons and parlours, and book or cancel
            appointments. SASA’s main focus is salon businesses, which provides
            services like hair cutting and styling, cosmetic treatments, hair
            treatments etc. Fortunately, SASA enables large businesses as well as
            small salons and parlours and different variations of salons including
            spas, and rejuvenation centres to connect with their customers.
            {'\n\n\n'}
            Benefit{'\n\n'}
            SASA will provide the facilities for scheduling the appointments for
            men’s saloons as well as ladies’ parlours. In this way, the customer’s
            time will be saved and owners can also boost their revenues by
            increasing the number of customers by using this application. They
            will only have to schedule appointments for his/her saloons and meet
            their customers. This will not only increase customer satisfaction but
            will allow the owners to utilize their resources more efficiently thus
            increasing their revenue.
            {'\n\n\n'}
            Assumptions
            {'\n\n'} --- Users always need not to sign up first. We allow users,
            the freedom to explore the usability of SASA and when they find it
            worthy, they can sign up. Moreover, we will give an access to limited
            features without sign up and let them enjoy complete features once
            they sign up to the app.
            {'\n\n'}--- It is assumed that there is no desktop application, but
            users can still access the SASA on the web platform, if they are on
            desktop
            {'\n\n'} --- It is assumed that application users will have a
            functional Internet connection.
            {'\n\n'} --- It is also assumed that application users will have
            permit to use location of the device. As location services will be
            used to provide quality services like showing nearby saloons.
            {'\n\n'} --- The rates that will be displayed are totally dependent
            upon the saloons, but if there is any need according to situation, we
            ourselves manage the rates by asking from saloon owners.
            {'\n\n'} --- It is also assumed that web-view of the application is
            just for desktop version. If someone tries to access web-version from
            mobile web-browser, he/she will be redirected to download page of the
            mobile application.
            {'\n\n\n'}
            How It Works?
            {'\n\n'}
            Yes, we care about you! If you are new to SASA, then you are at right
            place for understanding it's lifecycle. So, on the side menu bar,
            there are many options available.
            {'\n\n'}1- First option is: "Browse Categories"{'\n\n'}
            In Browse Categories you can browse different saloons, according to
            your gender, budget, quality you desire and more. After choosing
            saloon, you can add saloon deals, saloon services to your cart, and
            after selecting date and time you can make a request for appointment.
            {'\n\n'}2- Second option is: "Search Saloons Near"{'\n\n'}
            In Search Saloons Near Screen, you can search saloons near your
            searched place. You just have to search the place by writing place
            name in search bar. Then it will displayed the nearest saloons to that
            location. And you can select any one of them and make a request for
            appointment.
            {'\n\n'}3- Third option is: "Saloons Near Me"{'\n\n'}
            In Saloons Near Me option, you can search saloons near you. You just
            have to select this option, it will display list of saloons near you.
            You can select any one of them and make a request for appointment.
            {'\n\n'}4- Fourth option is: "Male Saloons"{'\n\n'}
            In Male Saloons option, you can search Male saloons near you. You just
            have to select this option, it will display list of Male saloons near
            you. You can select any one of them and make a request for
            appointment.
            {'\n\n'}5- Fifth option is: "Female Saloons"{'\n\n'}
            In Male Saloons option, you can search Female saloons near you. You
            just have to select this option, it will display list of Female
            saloons near you. You can select any one of them and make a request
            for appointment.
            {'\n\n'}6- Sixth option is: "My Appointments"{'\n\n'}
            In My Appointments option, you can keep track of your registered
            appointments. The appointments have 3 status values{'\n\n'} 1)
            Confirming Appointment{'\n'}
            This means your appointment has been registered and appointment is
            waiting for confirmation from saloon you registered with. {'\n\n'} 2)
            Confirmed Appointment
            {'\n'}This means your registered appointment has been confirmed by
            saloon, and you need to go to saloon at that specific time. {'\n\n'}{' '}
            3) Completed Appointment{'\n'}
            This means that either you successfully completed your appointment by
            going to the saloon or time passed, but you did not arrive the saloon
            at right time.
            {'\n\n'}
          </Text>
          ):(
            <Text style={howitWorksStyling.text}>
              
              یہ کیا ہے؟
                {'\n\n'}
ساسا (سیلون اپائنمنٹمنٹ اور شیڈولنگ ایپلی کیشن) ایک پلیٹ فارم ہے جس میں سیلون بزنس کی ایک وسیع رینج کو اپنے صارفین کے ساتھ ایک پلیٹ فارم کے تحت مربوط کرتا ہے۔ یہ ایک آن لائن برادری میں صارفین اور سیلون کو جوڑتا ہے
جو صارفین کو سیلون اور پارلروں کا سرفر کرنے ، اور ملاقاتیں بک یا منسوخ کرنے کی سہولت دیتے ہیں۔ SASA کی مرکزی توجہ سیلون بزنس ہے ، جو فراہم کرتی ہے
بال کٹنگ اور اسٹائل ، کاسمیٹک علاج ، بالوں کا علاج وغیرہ جیسی خدمات خوش قسمتی سے ، SASA بڑے کاروباروں کے ساتھ ساتھ چھوٹے سیلونوں اور پارلرز اور سیلون کی مختلف حالتوں سمیت اسپاس ، اور تجدیدی مراکز کو اپنے صارفین سے مربوط کرنے کے قابل بناتا ہے۔
           {'\n\n'}
فائدہ
           {'\n\n'}
           ساسا مردوں کے سیلون کے ساتھ ساتھ خواتین کے پارلروں کے لئے تقرریوں کے شیڈول کے لئے سہولیات مہیا کرے گا۔ اس طرح سے ، صارف کا وقت بچ جائے گا اور مالکان بھی اس ایپلی کیشن کا استعمال کرکے صارفین کی تعداد میں اضافہ کرکے اپنے محصول میں اضافہ کرسکتے ہیں۔ انہیں صرف اس کے سیلونوں کے لئے تقرریوں کا شیڈول بنانا ہوگا اور اپنے صارفین سے ملاقات کرنا ہوگی۔ اس سے نہ صرف صارفین کی اطمینان میں اضافہ ہوگا بلکہ مالکان اپنے وسائل کو زیادہ موثر انداز میں استعمال کرنے کی اجازت دیں گے اس طرح ان کی آمدنی میں اضافہ ہوگا۔            
           {'\n\n'}
           یہ کیسے کام کرتا ہے؟
           {'\n\n'}
           

 ہاں ، ہمیں آپ کی پرواہ ہے! اگر آپ ساسا میں نئے ہیں ، تو پھر آپ اس کی زندگی کو سمجھنے کے لئے صحیح جگہ پر ہیں۔ تو ، سائڈ مینو بار پر ، بہت سارے اختیارات دستیاب ہیں۔
          {'\n\n'}1- پہلا آپشن ہے: "زمرہ جات براؤز کریں"۔{'\n\n'}
براؤز کیٹیگریز میں آپ اپنی صنف ، بجٹ ، آپ کے معیار کے مطابق اور بہت کچھ کے مطابق مختلف سیلونز کو براؤز کرسکتے ہیں۔ سیلون کا انتخاب کرنے کے بعد ، آپ اپنے کارٹ میں سیلون ڈیلز ، سیلون خدمات شامل کرسکتے ہیں ، اور تاریخ اور وقت منتخب کرنے کے بعد آپ ملاقات کے لئے درخواست کرسکتے ہیں۔
          {'\n\n'}2- دوسرا آپشن ہے: "قریب سیلون تلاش کریں"{'\n\n'}
اسکرین کے قریب تلاشی والے سیلونز میں ، آپ اپنی تلاش شدہ جگہ کے قریب سیلون تلاش کرسکتے ہیں۔ آپ کو سرچ بار میں جگہ کا نام لکھ کر اس جگہ کو تلاش کرنا ہوگا۔ تب یہ اس مقام پر قریبی سیلونز دکھائے گا۔ اور آپ ان میں سے کسی کو بھی منتخب کرسکتے ہیں اور ملاقات کے لئے درخواست دے سکتے ہیں۔

          {'\n\n'}
          3- تیسرا آپشن ہے: "میرے قریب سیلونز"{'\n\n'}
          سیلون نزد میرے آپشن میں ، آپ اپنے قریب سیلون تلاش کرسکتے ہیں۔ آپ کو صرف یہ اختیار منتخب کرنا ہے ، یہ آپ کے قریب سیلون کی فہرست دکھائے گا۔ آپ ان میں سے کسی کو بھی منتخب کر سکتے ہیں اور ملاقات کے لئے درخواست دے سکتے ہیں۔
          {'\n\n'}
          4- چوتھا آپشن ہے: "مرد سیلونز"{'\n\n'}

          مرد سیلون آپشن میں ، آپ اپنے قریب مرد سیلون تلاش کرسکتے ہیں۔ آپ کو صرف یہ آپشن منتخب کرنا ہے ، یہ آپ کے قریب مرد سیلون کی فہرست دکھائے گا۔ آپ ان میں سے کسی کو بھی منتخب کر سکتے ہیں اور ملاقات کے لئے درخواست دے سکتے ہیں۔

            {'\n\n'}
            5- پانچواں آپشن یہ ہے: "خواتین سیلونز"{'\n\n'}
مرد سیلون آپشن میں ، آپ اپنے قریب خواتین سیلون تلاش کرسکتے ہیں۔ آپ کو صرف یہ آپشن منتخب کرنا ہے ، یہ آپ کے قریب خواتین سیلون کی فہرست دکھائے گا۔ آپ ان میں سے کسی کو بھی منتخب کر سکتے ہیں اور ملاقات کے لئے درخواست دے سکتے ہیں۔
{'\n\n'}
6- چھٹا آپشن یہ ہے: "میری تقرریوں"{'\n\n'}

میری تقرریوں کے اختیارات میں ، آپ اپنی رجسٹرڈ تقرریوں کا ٹریک رکھ سکتے ہیں۔

تقرریوں کی 3 حیثیت کی اقدار ہیں{'\n\n'}

1) تقرری کی تصدیق{'\n\n'}

اس کا مطلب یہ ہے کہ آپ کی ملاقات کا اندراج ہوچکا ہے اور ملاقات کے لئے سیلون سے تصدیق کے منتظر ہیں جس کے ساتھ آپ نے اندراج کیا ہے۔
{'\n\n'}
2) تصدیق شدہ تقرری{'\n\n'}
اس کا مطلب ہے کہ سیلون کے ذریعہ آپ کی رجسٹرڈ ملاقات کی تصدیق ہوگئی ہے ، اور آپ کو اس مخصوص وقت پر سیلون جانے کی ضرورت ہے۔
{'\n\n'}
3) مکمل تقرری{'\n\n'}

اس کا مطلب یہ ہے کہ یا تو آپ نے سیلون میں جاکر کامیابی سے اپنی تقرری مکمل کی یا وقت گزر گیا ، لیکن آپ صحیح وقت پر سیلون نہیں پہنچے۔
{'\n\n'}
        </Text>
          
          
          
          )
        }
       
        <View style={howitWorksStyling.gap} />
      </ScrollView>
    </View>
  );
}


export default HowItWorks;
