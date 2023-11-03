#!/bin/bash

# Define your API access token and the base URL
ACCESS_TOKEN="a4465669f2c3110f322361cecf02383599199a6794855ce77e597eec3374"
BASE_URL="https://dashboard.iproyal.com/api/residential/royal/reseller/sub-users"

# Set the page size to 100
PAGE_SIZE=100

# Make a curl request to list all sub users with the specified page size
api_response=$(curl -s --location "$BASE_URL?pageSize=$PAGE_SIZE" --header "X-Access-Token: Bearer $ACCESS_TOKEN")

# Extract sub user IDs from the JSON response using jq
sub_user_ids=$(echo "$api_response" | jq -r '.data[].id')

# Loop through the array of sub user IDs
for sub_user_id in $sub_user_ids
do
  echo "Deleting sub user with ID: $sub_user_id"
  curl -s --location -g --request DELETE "$BASE_URL/$sub_user_id" \
    --header "X-Access-Token: Bearer $ACCESS_TOKEN" \
    --header "Content-Type: application/json"
done

echo "All sub users have been deleted."
