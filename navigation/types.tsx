import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
Home: undefined;
Login: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
StackScreenProps<RootStackParamList, T>;

declare global {
namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
}
}