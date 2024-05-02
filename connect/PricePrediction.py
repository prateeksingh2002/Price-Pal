import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import random
import csv

import sys

# Check if an argument is provided
# if len(sys.argv) > 1:
#     user_input = sys.argv[1]
# else:
#     user_input = input("Please enter a value: ")

# Your existing code for Price Prediction using user_input

a = int(sys.argv[1])
b = a


print(a)
random_values = []

for i in range(100):
    x = a + 0.005*a
    y = a - 0.005*a
    a = random.randint(int(y), int(x))
    if(a < b*0.8 or a> b*1.2):
        a = b
    random_values.append(a)    
    
plt.plot(random_values)
plt.show()
	
csv_file_path = "prices.csv"

with open(csv_file_path, mode='w', newline='') as file:
    writer = csv.writer(file)

    # Write a header row with the column name
    writer.writerow(["Price"])

    # Loop through the list of numbers and write each number in a separate row
    for number in random_values:
        writer.writerow([number])
    

# Load your dataset (assuming you have a CSV file with columns 'Date' and 'Price')
data = pd.read_csv('prices.csv')

# Create lag features for the past 5 days
for i in range(1, 6):
    data[f'Price_Lag_{i}'] = data['Price'].shift(i)

# Drop rows with missing values (NaN) in the lag features
data.dropna(inplace=True)

# Separate the target variable (Price) and predictors (lag features)
X = data[['Price_Lag_1', 'Price_Lag_2', 'Price_Lag_3', 'Price_Lag_4', 'Price_Lag_5']]
y = data['Price']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mae}")
print(f"R-squared (R2) Score: {r2}")

latest_data = data.iloc[-1]  # Get the most recent data point
latest_input = latest_data[['Price_Lag_1', 'Price_Lag_2', 'Price_Lag_3', 'Price_Lag_4', 'Price_Lag_5']].values.reshape(1, -1)
next_price = model.predict(latest_input)

print(f"Predicted price for the very next time frame: {next_price[0]}")
print(y_pred)
# print(next_price)
y_pred = np.append(y_pred, next_price[0])
print(y_pred)


# Visualize the predictions (you can modify this based on your needs)

plt.plot(y_test.values, label='Actual Prices', color='blue')
plt.plot(y_pred, label='Predicted Prices', color='red')
plt.xlabel('Time')
plt.ylabel('Price')
plt.title('Price Prediction')
plt.legend()
plt.show()
