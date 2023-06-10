import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const StarIcon = styled(Ionicons)`
  margin-right: 2px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>
    {votes > 0 ? (
      <>
        <StarIcon name="star" size={10} color={"#ff904c"} />
        {votes}/10
      </>
    ) : (
      `Coming soon`
    )}
  </Text>
);

export default Votes;
