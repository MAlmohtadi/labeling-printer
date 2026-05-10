package com.allmartlabelprinter;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Typeface;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import net.posprinter.CPCLConst;
import net.posprinter.CPCLPrinter;
import net.posprinter.IConnectListener;
import net.posprinter.IDeviceConnection;
import net.posprinter.POSConnect;

public class XprinterHelperModule extends ReactContextBaseJavaModule {

    XprinterHelperModule(ReactApplicationContext context) {
        super(context);
    }

    private IConnectListener connectListener = new IConnectListener() {


        @Override
        public void onStatus(int code, String connInfo, String msg) {
            switch (code) {
                case POSConnect.CONNECT_SUCCESS:
                    Log.d("XprinterHelperModule","succ");
//                    UIUtils.toast(R.string.con_success);
//                    LiveEventBus.get(Boolean.class, Constant.EVENT_CONNECT_STATUS).post(true);
                    break;
                case POSConnect.CONNECT_FAIL:

                    Log.d("XprinterHelperModule","CONNECT_FAIL:" + msg);
//                    UIUtils.toast(R.string.con_failed);
//                    LiveEventBus.get(Boolean.class, Constant.EVENT_CONNECT_STATUS).post(false);
                    break;
                case POSConnect.CONNECT_INTERRUPT:
                    Log.d("XprinterHelperModule","CONNECT_INTERRUPT:" + msg);
//                    UIUtils.toast(R.string.con_has_disconnect);
//                    LiveEventBus.get(Boolean.class, Constant.EVENT_CONNECT_STATUS).post(false);
                    break;
                case POSConnect.SEND_FAIL:
                    Log.d("XprinterHelperModule","SEND_FAIL:" + msg);
//                    UIUtils.toast(R.string.send_failed);
                    break;
                case POSConnect.USB_DETACHED:
//                    UIUtils.toast(R.string.usb_detached);
                    break;
                case POSConnect.USB_ATTACHED:
//                    UIUtils.toast(R.string.usb_attached);
                    break;
            }
        }
    };

    private Bitmap textToImage(String txt) {
        Bitmap b = Bitmap.createBitmap(400, 70, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(b);
        Paint paint = new Paint();
        paint.setColor(Color.WHITE);
        paint.setStyle(Paint.Style.FILL);
        c.drawPaint(paint);

        paint.setColor(Color.BLACK);
        paint.setTextSize(40f);
        paint.setTypeface(Typeface.DEFAULT_BOLD);
        c.drawText(txt, 10F, 35F, paint);
        return b;
    }


    public static IDeviceConnection curConnect = null;
    @ReactMethod
    public void printXprinter(String connectionId,String title, String price, String barcode) throws InterruptedException {
        if(curConnect != null) {
         //   curConnect.close();
        }

        Log.d("XprinterHelperModule","started:");
        if(curConnect == null) {
            curConnect = POSConnect.createDevice(POSConnect.DEVICE_TYPE_BLUETOOTH);
            Log.d("XprinterHelperModule","device created:");
            curConnect.connect(connectionId, connectListener);
            Log.d("XprinterHelperModule","device connected1:");
            Thread.sleep(1000);
        }


        CPCLPrinter printer = new CPCLPrinter(curConnect);

        Log.d("XprinterHelperModule","device instance:");

        printer.initializePrinter(800)
                .addBarcodeText()
                .addCGraphics(getX(title.length()),35,400,textToImage(title))
                .addCGraphics(getX(price.length()),90,400,textToImage(price))
                .addBarcode(150, 190, CPCLConst.BCS_128, 70, barcode)
                .addPrint();

        Log.d("XprinterHelperModule","device printed:");
    }

    public Integer getX(Integer length) {
        if(length < 7) {
            return 185;
        } else if ( length < 11) {
            return 150;
        } else if ( length < 15) {
            return 110;
        } else if (length <18) {
            return 80;
        } else {
            return 25;
        }
    }
    @Override
    public String getName() {
        return "XprinterHelperModule";
    }
}
