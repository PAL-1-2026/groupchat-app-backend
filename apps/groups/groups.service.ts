import * as groupRepository from "@/apps/groups/groups.repository.ts"

export async function join(groupId: string, userId: string) {
    return await groupRepository.join(groupId, userId);
}

export async function getUserGroups(groupId: string) {
    return await groupRepository.getUserGroups(groupId);
}

export async function leave(groupId: string, userId: string) {
    return await groupRepository.leave(groupId, userId);
}
