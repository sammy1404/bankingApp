/*import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native"
import { LineChart } from "react-native-gifted-charts";



const Chart = (stockSymbol: string) => {
    console.log(stockSymbol);
    const stockPrices = selectStockPrices(stockSymbol as string);
    const [stockPrices ,selectStockPrices] 
    const positiveOverallPriceChange =
    stockPrices &&
    stockPrices[0].value < stockPrices[stockPrices.length - 1].value;
    const { width } = useWindowDimensions();




    return(
        <View style={{ paddingTop: 20 }}>
                <LineChart
                  areaChart
                  data={stockPrices}
                  rotateLabel
                  labelsExtraHeight={20}
                  hideDataPoints
                  spacing={width / stockPrices.length - 2}
                  color={positiveOverallPriceChange ? "green" : "red"}
                  thickness={2}
                  startFillColor={positiveOverallPriceChange ? "green" : "red"}
                  endFillColor={positiveOverallPriceChange ? "green" : "red"}
                  startOpacity={0.9}
                  endOpacity={0.2}
                  initialSpacing={0}
                  hideYAxisText={true}
                  rulesType="solid"
                  rulesColor="black"
                  xAxisColor="lightgray"
                  pointerConfig={{
                    pointerStripHeight: 140,
                    pointerStripColor: "lightgray",
                    pointerStripWidth: 2,
                    pointerColor: "lightgray",
                    radius: 6,
                    pointerLabelWidth: 100,
                    pointerLabelHeight: 90,
                    activatePointersOnLongPress: true,
                    autoAdjustPointerLabelPosition: false,
                    pointerLabelComponent: (items: any) => {
                      return (
                        <View
                          style={{
                            height: 90,
                            width: 100,
                            justifyContent: "center",
                            marginTop: -30,
                            marginLeft: -40,
                            borderRadius: 5,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              marginBottom: 6,
                              textAlign: "center",
                            }}
                          >
                            {items[0].date}
                          </Text>

                          <View
                            style={{
                              paddingHorizontal: 14,
                              paddingVertical: 6,
                              borderRadius: 16,
                              backgroundColor: "white",
                            }}
                          >
                            <Text
                              style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "black",
                              }}
                            >
                              {"$" + items[0].value.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      );
                    },
                  }}
                />
              </View>
    )
}

const styles = StyleSheet.create({
});

export default Chart*/